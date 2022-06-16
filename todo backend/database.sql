--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

-- Started on 2022-06-16 13:55:45

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 16540)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 3337 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 212 (class 1259 OID 16570)
-- Name: note; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.note (
    note_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    note_text text,
    todo_id uuid NOT NULL
);


ALTER TABLE public.note OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 16557)
-- Name: todo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.todo (
    todo_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    todo_text text NOT NULL,
    todo_done boolean NOT NULL,
    created_at date NOT NULL,
    user_id uuid NOT NULL
);


ALTER TABLE public.todo OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 16551)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    is_super_admin boolean NOT NULL,
    user_firstname character varying(50) NOT NULL,
    user_lastname character varying(50) NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(250),
    email character varying(50)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 3190 (class 2606 OID 16577)
-- Name: note note_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.note
    ADD CONSTRAINT note_pkey PRIMARY KEY (note_id);


--
-- TOC entry 3188 (class 2606 OID 16564)
-- Name: todo todo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.todo
    ADD CONSTRAINT todo_pkey PRIMARY KEY (todo_id);


--
-- TOC entry 3186 (class 2606 OID 16556)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 3192 (class 2606 OID 16578)
-- Name: note note_todo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.note
    ADD CONSTRAINT note_todo_id_fkey FOREIGN KEY (todo_id) REFERENCES public.todo(todo_id);


--
-- TOC entry 3191 (class 2606 OID 16565)
-- Name: todo todo_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.todo
    ADD CONSTRAINT todo_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


-- Completed on 2022-06-16 13:55:45

--
-- PostgreSQL database dump complete
--

