from flask import *

pic = Blueprint('pic', __name__, template_folder='templates')

@pic.route('/pic')
def pic_route():
	print("pic_route just happened");
	options = {
		"edit": False
	}
	return render_template("pic.html", **options)

@pic.route('/pic/edit')
def edit_pic_route():
	print("pic_edit_route just ran");
	options = {
		"edit": True
	}
	return render_template("pic.html", **options)