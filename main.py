from flask import Flask, render_template, request

app = Flask(__name__, static_folder='static')

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/submit", methods=["POST"])
def submit():
    name = request.form.get("name")
    email = request.form.get("email")
    message = request.form.get("message")
    print(f"Message received from {name} ({email}): {message}")
    return "Thank you for reaching out! We'll get back to you soon."

if __name__ == "__main__":
    app.run(debug=True)
