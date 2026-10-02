from datetime import datetime
from typing import Optional

from sqlalchemy import Column, String, UniqueConstraint
from sqlmodel import Field, Relationship, SQLModel

from model.types import PrismaDateTime


class PreventiveOSToWorkerLink(SQLModel, table=True):
    __tablename__ = "_PreventiveOSToWorker" # type: ignore

    A: int = Field(
        primary_key=True,
        foreign_key="PreventiveOS.id",
        ondelete="CASCADE",
    )
    B: int = Field(
        primary_key=True,
        foreign_key="Worker.id",
        ondelete="CASCADE",
    )


class Nature(SQLModel, table=True):
    __tablename__ = "Nature" # type: ignore

    id: Optional[int] = Field(default=None, primary_key=True)
    name: str

    preventive_os: list["PreventiveOS"] = Relationship(back_populates="nature")
    preventive_actions: list["PreventiveAction"] = Relationship(
        back_populates="nature"
    )


class Machine(SQLModel, table=True):
    __tablename__ = "Machine" # type: ignore

    id: Optional[int] = Field(default=None, primary_key=True)
    tag: str = Field(unique=True)
    ute: str
    technology: str

    preventive_os: list["PreventiveOS"] = Relationship(back_populates="machine")
    preventive_actions: list["PreventiveAction"] = Relationship(
        back_populates="machine"
    )


class Worker(SQLModel, table=True):
    __tablename__ = "Worker" # type: ignore

    id: Optional[int] = Field(default=None, primary_key=True)
    registration: int = Field(unique=True)
    name: str
    workerClass: str = Field(sa_column=Column("class", String, nullable=False))

    preventive_os: list["PreventiveOS"] = Relationship(
        back_populates="responsible", link_model=PreventiveOSToWorkerLink
    )


class PreventiveActionTaken(SQLModel, table=True):
    __tablename__ = "PreventiveActionTaken" # type: ignore

    id: Optional[int] = Field(default=None, primary_key=True)
    date: datetime = Field(sa_type=PrismaDateTime)
    osId: int = Field(foreign_key="PreventiveOS.id", ondelete="RESTRICT")
    actionId: int = Field(foreign_key="PreventiveAction.id", ondelete="RESTRICT")
    weekCode: str

    action: "PreventiveAction" = Relationship(back_populates="actions_taken")
    os: "PreventiveOS" = Relationship(back_populates="actions_taken")


class PreventiveAction(SQLModel, table=True):
    __tablename__ = "PreventiveAction" # type: ignore

    id: Optional[int] = Field(default=None, primary_key=True)
    description: str
    machineId: int = Field(foreign_key="Machine.id", ondelete="RESTRICT")
    excution: str
    frequency: int
    nextExecution: str
    preventiveOSId: Optional[int] = Field(
        default=None, foreign_key="PreventiveOS.id", ondelete="SET NULL"
    )
    natureId: int = Field(foreign_key="Nature.id", ondelete="RESTRICT")
    ignore: bool = Field(default=False)

    machine: "Machine" = Relationship(back_populates="preventive_actions")
    nature: "Nature" = Relationship(back_populates="preventive_actions")
    preventive_os: Optional["PreventiveOS"] = Relationship(back_populates="actions")
    actions_taken: list["PreventiveActionTaken"] = Relationship(
        back_populates="action"
    )


class PreventiveOS(SQLModel, table=True):
    __tablename__ = "PreventiveOS" # type: ignore

    id: Optional[int] = Field(default=None, primary_key=True)
    weekCode: str
    date: Optional[datetime] = Field(default=None, sa_type=PrismaDateTime)
    natureId: int = Field(foreign_key="Nature.id", ondelete="RESTRICT")
    duration: Optional[int] = Field(default=None)
    concluded: Optional[bool] = Field(default=False)
    startTime: Optional[datetime] = Field(default=None, sa_type=PrismaDateTime)
    finishTime: Optional[datetime] = Field(default=None, sa_type=PrismaDateTime)
    machineId: int = Field(foreign_key="Machine.id", ondelete="RESTRICT")
    actionsUniqueKey: str

    nature: "Nature" = Relationship(back_populates="preventive_os")
    machine: "Machine" = Relationship(back_populates="preventive_os")
    responsible: list["Worker"] = Relationship(
        back_populates="preventive_os", link_model=PreventiveOSToWorkerLink
    )
    actions: list["PreventiveAction"] = Relationship(back_populates="preventive_os")
    actions_taken: list["PreventiveActionTaken"] = Relationship(
        back_populates="os"
    )

    __table_args__ = (
        UniqueConstraint(
            "machineId",
            "natureId",
            "weekCode",
            "actionsUniqueKey",
            name="PreventiveOS_machineId_natureId_weekCode_actionsUniqueKey_key",
        ),
    )
