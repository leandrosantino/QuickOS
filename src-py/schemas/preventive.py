from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field


class GetServiceOrderByIdParams(BaseModel):
    model_config = ConfigDict(extra="forbid")

    id: int = Field(gt=0)


class Machine(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: int
    tag: str
    ute: str
    technology: str


class Nature(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: int
    name: str


class Worker(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: int
    registration: int
    name: str
    workerClass: str


class Action(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: int
    description: str
    machineId: int
    excution: str
    frequency: int
    nextExecution: str
    preventiveOSId: Optional[int] = None
    natureId: int
    ignore: bool
    machine: Optional[Machine] = None
    nature: Optional[Nature] = None


class ActionTaken(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: int
    date: datetime
    osId: int
    actionId: int
    weekCode: str
    action: Action


class ServiceOrder(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: int
    weekCode: str
    date: Optional[datetime] = None
    natureId: int
    duration: Optional[int] = None
    concluded: Optional[bool] = None
    startTime: Optional[datetime] = None
    finishTime: Optional[datetime] = None
    machineId: int
    actionsUniqueKey: str
    nature: Optional[Nature] = None
    machine: Optional[Machine] = None
    responsible: list[Worker] = Field(default_factory=list)
    actions: list[Action] = Field(default_factory=list)
    actionsTaken: list[ActionTaken] = Field(default_factory=list)
