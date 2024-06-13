## Nicholas Christopher Rudy
## 2172020

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///videogames.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
CORS(app)


class Publisher(db.Model):
    publisher_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)


class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    dev_studio = db.Column(db.String(100), nullable=False)
    publisher_id = db.Column(db.Integer, db.ForeignKey('publisher.publisher_id'), nullable=False)


@app.route('/publishers', methods=['GET', 'POST'])
def handle_publishers():
    if request.method == 'POST':
        data = request.json
        new_publisher = Publisher(name=data['name'])
        db.session.add(new_publisher)
        db.session.commit()
        return jsonify({'publisher_id': new_publisher.publisher_id, 'name': new_publisher.name}), 201
    else:
        publishers = Publisher.query.all()
        return jsonify([{'publisher_id': p.publisher_id, 'name': p.name} for p in publishers])


@app.route('/publishers/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def handle_publisher(id):
    publisher = Publisher.query.get_or_404(id)
    if request.method == 'GET':
        return jsonify({'publisher_id': publisher.publisher_id, 'name': publisher.name})
    elif request.method == 'PUT':
        data = request.json
        publisher.name = data['name']
        db.session.commit()
        return jsonify({'publisher_id': publisher.publisher_id, 'name': publisher.name})
    elif request.method == 'DELETE':
        db.session.delete(publisher)
        db.session.commit()
        return '', 204


@app.route('/games', methods=['GET', 'POST'])
def handle_games():
    if request.method == 'POST':
        data = request.json
        new_game = Game(
            title=data['title'],
            dev_studio=data['dev_studio'],
            publisher_id=data['publisher_id']
        )
        db.session.add(new_game)
        db.session.commit()
        return jsonify({
            'id': new_game.id,
            'title': new_game.title,
            'dev_studio': new_game.dev_studio,
            'publisher_id': new_game.publisher_id
        }), 201
    else:
        games = db.session.query(Game, Publisher).join(Publisher, Game.publisher_id == Publisher.publisher_id).all()
        return jsonify([
            {
                'id': game.id,
                'title': game.title,
                'dev_studio': game.dev_studio,
                'publisher_id': game.publisher_id,
                'publisher_name': publisher.name
            }
            for game, publisher in games
        ])


@app.route('/games/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def handle_game(id):
    game = Game.query.get_or_404(id)
    if request.method == 'GET':
        publisher = Publisher.query.get(game.publisher_id)
        return jsonify({
            'id': game.id,
            'title': game.title,
            'dev_studio': game.dev_studio,
            'publisher_id': game.publisher_id,
            'publisher_name': publisher.name
        })
    elif request.method == 'PUT':
        data = request.json
        game.title = data['title']
        game.dev_studio = data['dev_studio']
        game.publisher_id = data['publisher_id']
        db.session.commit()
        return jsonify({
            'id': game.id,
            'title': game.title,
            'dev_studio': game.dev_studio,
            'publisher_id': game.publisher_id
        })
    elif request.method == 'DELETE':
        db.session.delete(game)
        db.session.commit()
        return '', 204


@app.before_request
def create_tables():
    db.create_all()


if __name__ == '__main__':
    app.run(port=5000, debug=True)