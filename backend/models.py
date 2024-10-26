from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from database import Base

class GameResult(Base):
    __tablename__ = "game_results"

    id = Column(Integer, primary_key=True, index=True)
    winner = Column(String, nullable=False)  # Could be 'X', 'O', or 'Draw'
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

    def __repr__(self):
        return f"<GameResult(id={self.id}, winner={self.winner}, timestamp={self.timestamp})>"
