from flask import Flask, render_template, request, jsonify
import urllib.parse  # Import for encoding URL parameters

app = Flask(__name__, static_folder='static')

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/portfolio")
def portfolio():
    return render_template("portfolio.html")

@app.route('/reels')
def reels():
    return render_template('reels.html')

@app.route('/event-teasers')
def event_teasers():
    return render_template('event_teasers.html')

@app.route('/songs')
def songs():
    return render_template('songs.html')

@app.route('/short-films')
def short_films():
    return render_template('short_films.html')

@app.route('/event-highlights')
def event_highlights():
    return render_template('event_highlights.html')

@app.route("/submit", methods=["POST"])
def submit():
    name = request.form.get("name")
    phone = request.form.get("phone")
    email = request.form.get("email", "")  # Default to empty string if not provided
    message = request.form.get("message", "")  # Default to empty string if not provided

    # Construct the WhatsApp message dynamically
    whatsapp_message = f"Hi, I’m {name} looking for a professional video editor for my upcoming project. I’d love to discuss how we can work together! You can contact me on {phone}."

    if email:
        whatsapp_message += f" Email: {email}."

    if message:
        whatsapp_message += f" Special message: {message}."

    # Encode message for URL
    encoded_message = urllib.parse.quote(whatsapp_message)

    # Generate WhatsApp link
    whatsapp_link = f"https://api.whatsapp.com/send?phone=+919904863345&text={encoded_message}"

    return jsonify({"success": True, "whatsapp_link": whatsapp_link, "message": "Thank you for reaching out! We'll get back to you soon."})

if __name__ == "__main__":
    app.run(debug=True)
