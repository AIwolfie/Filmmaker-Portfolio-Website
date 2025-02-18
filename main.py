from flask import Flask, render_template, request, jsonify
import urllib.parse
from markupsafe import escape  # Protect against XSS
from flask_limiter import Limiter  # Prevent abuse with rate-limiting
from flask_limiter.util import get_remote_address

app = Flask(__name__, static_folder='static')

# Enable Rate Limiting (limit to 5 requests per minute per IP)
limiter = Limiter(get_remote_address, app=app, default_limits=["5 per minute"])

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
    return render_template('event-teasers.html')

@app.route('/photos')
def photos():
    return render_template('photos.html')

@app.route('/short-film')
def short_films():
    return render_template('short-film.html')

@app.route('/event-highlights')
def event_highlights():
    return render_template('event-highlights.html')


@app.route("/submit", methods=["POST"])
@limiter.limit("3 per minute")  # Limit submissions to 3 per minute per IP
def submit():
    name = escape(request.form.get("name", "").strip())  # Escape HTML
    phone = escape(request.form.get("phone", "").strip())
    email = escape(request.form.get("email", "").strip())
    message = escape(request.form.get("message", "").strip())

    if not name or not phone:
        return jsonify({"success": False, "message": "Name and phone are required!"}), 400

    # Construct the WhatsApp message dynamically
    whatsapp_message = f"Hi, I’m {name} looking for a professional video editor for my upcoming project. Contact: {phone}."

    if email:
        whatsapp_message += f" Email: {email}."

    if message:
        whatsapp_message += f" Special message: {message}."

    # Encode message for URL
    encoded_message = urllib.parse.quote(whatsapp_message)

    # Generate WhatsApp link
    whatsapp_link = f"https://api.whatsapp.com/send?phone=+919904863345&text={encoded_message}"

    return jsonify({"success": True, "whatsapp_link": whatsapp_link,
                    "message": "Thank you for reaching out! We'll get back to you soon."})


if __name__ == "__main__":
    app.run(debug=True)
