#!/usr/bin/env python2

from flask import Flask, render_template, request, send_from_directory
app = Flask(__name__, static_url_path='')

#app.jinja_env.add_extension('pyjade.ext.jinja.PyJadeExtension')

@app.route('/')
def main():
    return render_template('index.html')

@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('js', path)

@app.route('/css/<path:path>')
def send_css(path):
    return send_from_directory('css', path)

@app.route('/font-awesome/<path:path>')
def send_font_awesome(path):
    return send_from_directory('font-awesome', path)

@app.route('/img/<path:path>')
def send_img(path):
    return send_from_directory('img', path)

@app.route('/mail/<path:path>', methods=['GET', 'POST'])
def send_mail(path):
    return send_from_directory('mail', path)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
