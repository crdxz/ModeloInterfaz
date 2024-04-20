/*==============================================================*/
/* DBMS name:      ORACLE Version 12c                           */
/* Created on:     19/04/2024 5:01:19 p. m.                     */
/*==============================================================*/


alter table CANDIDATO
   drop constraint FK_CANDIDATO_PT_TIPODOC;

drop index PT_FK;

drop table CANDIDATO cascade constraints;

drop table TIPODOC cascade constraints;
s
/*==============================================================*/
/* Table: CANDIDATO                                               */
/*==============================================================*/
create table CANDIDATO (
   USUARIO              VARCHAR2(30)          not null,
   IDTIPODOC            VARCHAR2(3)           not null,
   NDOC                 NUMBER(15)            not null,
   NOMBRE               VARCHAR2(30)          not null,
   APELLIDO             VARCHAR2(30)          not null,
   FECHANAC             DATE                  not null,
   constraint PK_CANDIDATO primary key (USUARIO)
);

/*==============================================================*/
/* Index: PT_FK                                                 */
/*==============================================================*/
create index PT_FK on CANDIDATO (
   IDTIPODOC ASC
);

/*==============================================================*/
/* Table: TIPODOC                                               */
/*==============================================================*/
create table TIPODOC (
   IDTIPODOC            VARCHAR2(3)           not null,
   DESCTIPODOC          VARCHAR2(40)          not null,
   constraint PK_TIPODOC primary key (IDTIPODOC)
);

alter table CANDIDATO
   add constraint FK_CANDIDATO_PT_TIPODOC foreign key (IDTIPODOC)
      references TIPODOC (IDTIPODOC);

