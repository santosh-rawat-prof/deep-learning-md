package com.backend.model;

public class Result {
    private String equipment;
    private String brand;
    private String confidence;

    public Result() {}

    public Result(String equipment, String brand, String confidence) {
        this.equipment = equipment;
        this.brand = brand;
        this.confidence = confidence;
    }

    public String getEquipment() {
        return equipment;
    }

    public void setEquipment(String equipment) {
        this.equipment = equipment;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getConfidence() {
        return confidence;
    }

    public void setConfidence(String confidence) {
        this.confidence = confidence;
    }

    @Override
    public String toString() {
        return "Result [equipment=" + equipment + ", brand=" + brand + ", confidence=" + confidence + "]";
    }
}
