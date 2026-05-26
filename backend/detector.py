from ultralytics import YOLO

# Lightweight YOLO model for MacBook Air
model = YOLO("yolov8n.pt")


def detect_objects(image_path):

    results = model(image_path)

    detections = []
    unique_labels = set()

    for r in results:
        for box in r.boxes:

            cls = int(box.cls[0])
            label = model.names[cls]
            conf = float(box.conf[0])

            # Ignore weak detections
            if conf < 0.5:
                continue

            # Avoid duplicate labels
            if label in unique_labels:
                continue

            unique_labels.add(label)

            detections.append(label)

    return detections