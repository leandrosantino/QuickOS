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


class ActionCreate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    description: str
    machineId: int
    excution: str
    frequency: int
    natureId: int
    nextExecution: str
    preventiveOSId: Optional[int] = None
    ignore: bool


class UpdateActionParams(BaseModel):
    model_config = ConfigDict(extra="forbid")

    id: int = Field(gt=0)
    data: ActionCreate


class DeleteActionParams(BaseModel):
    model_config = ConfigDict(extra="forbid")

    id: int = Field(gt=0)


class WorkerRef(BaseModel):
    model_config = ConfigDict(extra="forbid")

    id: int = Field(gt=0)


class ExecuteServiceOrderData(BaseModel):
    model_config = ConfigDict(extra="forbid")

    date: str
    workers: list[WorkerRef] = Field(default_factory=list)
    startTime: str
    finishTime: str


class ExecuteServiceOrdersParams(BaseModel):
    model_config = ConfigDict(extra="forbid")

    id: int = Field(gt=0)
    date: str
    workers: list[WorkerRef] = Field(default_factory=list)
    startTime: str
    finishTime: str


class UpdateServiceOrderParams(BaseModel):
    model_config = ConfigDict(extra="forbid")

    id: int = Field(gt=0)
    data: ExecuteServiceOrderData


class DeleteServiceOrderParams(BaseModel):
    model_config = ConfigDict(extra="forbid")

    id: int = Field(gt=0)


class GetServiceOrderCountParams(BaseModel):
    model_config = ConfigDict(extra="forbid")

    week: int
    year: int


class GetActionsParams(BaseModel):
    model_config = ConfigDict(extra="forbid")

    searchText: str
    weekCode: str
    machineId: int
    natureId: int
    showIgnore: bool
    limit: Optional[int] = None
    cursor: Optional[int] = None


class AssembleServiceOrdersParams(BaseModel):
    model_config = ConfigDict(extra="forbid")

    week: int
    year: int
    status: str
    nature: int
    machine: int


class ServiceOrderCount(BaseModel):
    model_config = ConfigDict(extra="ignore")

    finished: int
    unfinished: int


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
