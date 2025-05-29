from sqlalchemy.orm import Session
from models import User, Deck, Card, DeckCard
from schemas import UserCreate, DeckCreate, CardCreate
from auth.utils import get_password_hash


# ---------------------------
# USER CRUD
# ---------------------------

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()

def create_user(db: Session, user: UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


# ---------------------------
# DECK CRUD
# ---------------------------

def create_deck(db: Session, user_id: int, deck: DeckCreate):
    db_deck = Deck(name=deck.name, owner_id=user_id)
    db.add(db_deck)
    db.commit()
    db.refresh(db_deck)
    return db_deck

def get_user_decks(db: Session, user_id: int):
    return db.query(Deck).filter(Deck.owner_id == user_id).all()

def get_deck(db: Session, deck_id: int):
    return db.query(Deck).filter(Deck.id == deck_id).first()


# ---------------------------
# CARD CRUD
# ---------------------------

def create_card(db: Session, card: CardCreate):
    db_card = Card(**card.dict())
    db.add(db_card)
    db.commit()
    db.refresh(db_card)
    return db_card

def add_card_to_deck(db: Session, deck_id: int, card_id: int, quantity: int = 1):
    existing = db.query(DeckCard).filter_by(deck_id=deck_id, card_id=card_id).first()
    if existing:
        existing.quantity += quantity
    else:
        deck_card = DeckCard(deck_id=deck_id, card_id=card_id, quantity=quantity)
        db.add(deck_card)
    db.commit()
