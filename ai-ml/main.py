## Run command: 
# uvicorn main:app --host 0.0.0.0 --port 8000


## For installing all the dependency
# Run command:
# pip install torch torchvision fastapi uvicorn python-multipart pillow



from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import torch
import torchvision.transforms as transforms
import io
from torchvision import models
import torch.nn as nn
import torch.nn.functional as F

# class_labels = ["Scalpel", "Forceps", "Retractor", "Scissors"]
class_labels =  ['Curved Mayo Scissor', 'Scalpel', 'Straight Dissection Clamp', 'Straight Mayo Scissor']

def load_model():
    model = models.resnet18(weights=None)
    model.fc = nn.Linear(512, 4)  # Replace 10 with your class count
    model.load_state_dict(torch.load("surgical_model.pth", map_location="cpu"))
    model.eval()
    return model

model = load_model()

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    input_tensor = transform(image).unsqueeze(0)

    with torch.no_grad():
        outputs = model(input_tensor)
        probabilities = F.softmax(outputs, dim=1)
        predicted_class_idx = torch.argmax(probabilities, dim=1).item()
        confidence = probabilities[0][predicted_class_idx].item()
        predicted_class_name = class_labels[predicted_class_idx]

    return {
        "prediction": predicted_class_name,
        "confidence": round(confidence, 4)
    }
