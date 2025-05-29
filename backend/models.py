from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

# Association Table between decks and cards
class DeckCard(Base):
    __tablename__ = 'deck_card'
    id = Column(Integer, primary_key=True, index=True)
    deck_id = Column(Integer, ForeignKey('decks.id'))
    card_id = Column(Integer, ForeignKey('cards.id'))
    quantity = Column(Integer, default=1)

# User model
class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    decks = relationship("Deck", back_populates="owner")

# Card model
class Card(Base):
    __tablename__ = 'cards'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    set_code = Column(String, nullable=True)
    collector_number = Column(String, nullable=True)
    deck_cards = relationship("DeckCard", backref="card")

# Deck model
class Deck(Base):
    __tablename__ = 'decks'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    owner_id = Column(Integer, ForeignKey('users.id'))
    owner = relationship("User", back_populates="decks")
    cards = relationship("DeckCard", backref="deck")
