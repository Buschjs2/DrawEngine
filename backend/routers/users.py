# backend/routers/users.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from schemas import UserCreate, UserLogin, UserOut, Token
from database import SessionLocal
from crud import get_user_by_email, create_user
from auth.utils import verify_password, get_password_hash
from database import get_db
from auth.auth import create_access_token
from models import User

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register", response_model=UserOut)
def register(user: UserCreate, db: Session = Depends(get_db)):
    if user.password != user.confirm_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"field": "confirm_password", "message": "Passwords do not match."}
        )

    if db.query(User).filter(User.username == user.username).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"field": "username", "message": "Username is already taken."}
        )

    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"field": "email", "message": "Email is already registered."}
        )

    db_user = create_user(db=db, user=user)
    return db_user


@router.post("/login", response_model=Token)
def login(user: UserLogin, db: Session = Depends(get_db)):
    user_obj = (
        db.query(User)
        .filter(
            (User.email == user.username_or_email) | (User.username == user.username_or_email)
        )
        .first()
    )
    if not user_obj or not verify_password(user.password, user_obj.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = create_access_token(data={"sub": user_obj.email})
    return {"access_token": access_token, "token_type": "bearer"}