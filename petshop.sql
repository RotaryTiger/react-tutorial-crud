--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.3
-- Dumped by pg_dump version 9.5.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: dogs; Type: TABLE; Schema: public; Owner: danielmacphee
--

CREATE TABLE dogs (
    id integer NOT NULL,
    name character varying(50),
    breed character varying(50),
    age integer,
    gender character varying(1),
    notes character varying(255)
);


ALTER TABLE dogs OWNER TO danielmacphee;

--
-- Name: dogs_id_seq; Type: SEQUENCE; Schema: public; Owner: danielmacphee
--

CREATE SEQUENCE dogs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE dogs_id_seq OWNER TO danielmacphee;

--
-- Name: dogs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: danielmacphee
--

ALTER SEQUENCE dogs_id_seq OWNED BY dogs.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: danielmacphee
--

ALTER TABLE ONLY dogs ALTER COLUMN id SET DEFAULT nextval('dogs_id_seq'::regclass);


--
-- Data for Name: dogs; Type: TABLE DATA; Schema: public; Owner: danielmacphee
--

COPY dogs (id, name, breed, age, gender, notes) FROM stdin;
7	toby	schnauzer	3	M	good
8	alyssa	corgi	7	F	v good, imo
9	barktholomew	boxer	1	M	extremely good
\.


--
-- Name: dogs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: danielmacphee
--

SELECT pg_catalog.setval('dogs_id_seq', 9, true);


--
-- Name: dogs_name_key; Type: CONSTRAINT; Schema: public; Owner: danielmacphee
--

ALTER TABLE ONLY dogs
    ADD CONSTRAINT dogs_name_key UNIQUE (name);


--
-- Name: dogs_pkey; Type: CONSTRAINT; Schema: public; Owner: danielmacphee
--

ALTER TABLE ONLY dogs
    ADD CONSTRAINT dogs_pkey PRIMARY KEY (id);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

