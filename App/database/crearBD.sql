/*==============================================================*/
/* DBMS name:      ORACLE Version 12c                           */
/* Created on:     15/10/2023 10:40:38 p. m.                    */
/*==============================================================*/


alter table PERSONA
   drop constraint FK_PERSONA_PT_TIPODOC;

drop index PT_FK;

drop table PERSONA cascade constraints;

drop table TIPODOC cascade constraints;
s
/*==============================================================*/
/* Table: PERSONA                                               */
/*==============================================================*/
create table PERSONA (
   IDTIPODOC            VARCHAR2(3)           not null,
   NDOCUMENTO           VARCHAR2(12)          not null,
   NOMBRE               VARCHAR2(30)          not null,
   APELLIDO             VARCHAR2(30)          not null,
   DIRECCION            VARCHAR2(30)          not null,
   CORREO               VARCHAR2(50)          not null,
   CELULAR              VARCHAR2(15)          not null,
   constraint PK_PERSONA primary key (IDTIPODOC, NDOCUMENTO)
);

/*==============================================================*/
/* Index: PT_FK                                                 */
/*==============================================================*/
create index PT_FK on PERSONA (
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

alter table PERSONA
   add constraint FK_PERSONA_PT_TIPODOC foreign key (IDTIPODOC)
      references TIPODOC (IDTIPODOC);

