from face_detection import create_app
PORT=3005

if __name__ == "__main__":
    app = create_app()
    app.run(port=3005)
