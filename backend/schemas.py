from pydantic import BaseModel, EmailStr
from typing import List, Optional

# User base
class UserBase(BaseModel):
    username: str
    email: EmailStr

# User creation input
class UserCreate(UserBase):
    email: EmailStr
    password: str
    
# User login input
class UserLogin(BaseModel):
    email: EmailStr
    password: str
    
# User Output
class UserOut(BaseModel):
    id: int
    email: EmailStr
    
    class Config:
        from_attributes = True

# Response schema for reading user data
class UserRead(UserBase):
    id: int

    class Config:
        orm_mode = True

# Token response
class Token(BaseModel):
    access_token: str
    token_type: str

# Token payload (used in decoding JWT)
class TokenData(BaseModel):
    username: Optional[str] = None

# Card schema
class CardBase(BaseModel):
    name: str
    set_code: Optional[str] = None
    collector_number: Optional[str] = None

class CardCreate(CardBase):
    pass

class CardRead(CardBase):
    id: int

    class Config:
        orm_mode = True

# DeckCard schema (card + quantity in a deck)
class DeckCardRead(BaseModel):
    card: CardRead
    quantity: int

    class Config:
        orm_mode = True

# Deck schema
class DeckBase(BaseModel):
    name: str

class DeckCreate(DeckBase):
    pass

class DeckRead(DeckBase):
    id: int
    owner_id: int
    cards: List[DeckCardRead] = []

    class Config:
        orm_mode = True
