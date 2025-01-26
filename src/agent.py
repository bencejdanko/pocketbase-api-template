"""""""

from dataclasses import dataclass
from database import DatabaseConn

from pydantic import BaseModel, Field
from pydantic_ai import Agent, RunContext

DATABASE_URL = "sqlite:///./pb_data/data.db"

class DatabaseConn:


@dataclass
class SupportDependencies:
    user_id: int
    db: DatabaseConn

agent = Agent(
    'gemini-1.5-flash',
    deps_type=SupportDependencies,
    system_prompt=""
)
        
class SupportResult(BaseModel):
