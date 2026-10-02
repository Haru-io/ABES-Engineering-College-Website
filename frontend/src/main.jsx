import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";

import {
  Menu,
  X,
  ArrowRight,
  GraduationCap,
  BookOpen,
  Users,
  FlaskConical,
  MessageCircle,
  Send,
  Sparkles,
} from "lucide-react";

import "./styles.css";


// ========================================
// ACADEMIC PROGRAMS
// ========================================

const programs = [
  [
    "B.Tech",
    "Computer Science & Engineering",
    "Modern computing, software engineering and emerging technologies.",
  ],
  [
    "B.Tech",
    "Artificial Intelligence & Machine Learning",
    "AI, machine learning and intelligent systems.",
  ],
  [
    "B.Tech",
    "Data Science",
    "Data analytics, statistics and applied machine learning.",
  ],
  [
    "B.Tech",
    "Electronics & Communication",
    "Electronics, communication and embedded systems.",
  ],
  [
    "MCA",
    "Master of Computer Applications",
    "Advanced applications and software development.",
  ],
  [
    "M.Tech",
    "Computer Science & Engineering",
    "Advanced engineering and research.",
  ],
];


// ========================================
// MAIN APP
// ========================================

function App() {

  const [mobile, setMobile] = useState(false);
  const [chat, setChat] = useState(false);
  const [q, setQ] = useState("");

  const [msgs, setMsgs] = useState([
    {
      r: "a",
      t: "Hello! I’m the ABES AI Student Assistant. Ask me about admissions, academics, placements or campus life.",
    },
  ]);


  // ========================================
  // SEND MESSAGE TO P_200 AI
  // ========================================

  const send = async (text = q) => {

    text = text.trim();

    if (!text) {
      return;
    }

    // Clear input
    setQ("");


    // Show user's message immediately
    setMsgs((messages) => [
      ...messages,
      {
        r: "u",
        t: text,
      },
    ]);


    try {

      console.log(
        "Sending question to ABES backend:",
        text
      );


      // ========================================
      // ABES BACKEND
      // ========================================

      const response = await axios.post(
        "https://p200-backend.onrender.com/api/chat",
        {
          message: text,
        }
      );


      const data = response.data;


      console.log(
        "P_200 AI response:",
        data
      );


      // ========================================
      // SHOW AI RESPONSE
      // ========================================

      setMsgs((messages) => [
        ...messages,
        {
          r: "a",
          t:
            data.answer ||
            "No answer was received from P_200 AI.",
        },
      ]);


    } catch (error) {

      console.error(
        "Chat API error:",
        error
      );


      // ========================================
      // ERROR MESSAGE
      // ========================================

      setMsgs((messages) => [
        ...messages,
        {
          r: "a",
          t: "Sorry, I could not connect to the P_200 AI service.",
        },
      ]);

    }
  };


  // ========================================
  // APP UI
  // ========================================

  return (
    <div>


      {/* ======================================
          TOP BAR
      ====================================== */}

      <div className="top">
        Admissions &nbsp; | &nbsp;
        Student Portal &nbsp; | &nbsp;
        Faculty Portal &nbsp; | &nbsp;
        Contact
      </div>


      {/* ======================================
          NAVBAR
      ====================================== */}

      <header>

        <div className="wrap nav">


          {/* LOGO */}

          <div className="logo">

            <div className="mark">
              A
            </div>

            <div>
              <b>ABES</b>

              <small>
                ENGINEERING COLLEGE
              </small>
            </div>

          </div>


          {/* NAVIGATION */}

          <nav className={mobile ? "open" : ""}>

            {[
              "About",
              "Academics",
              "Admissions",
              "Placements",
              "Campus",
              "Research",
            ].map((item) => (

              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobile(false)}
              >
                {item}
              </a>

            ))}


            <button
              onClick={() => setChat(true)}
            >
              <Sparkles size={16} />
              AI Support
            </button>

          </nav>


          {/* MOBILE MENU */}

          <button
            className="hamb"
            onClick={() => setMobile(!mobile)}
          >
            {mobile ? <X /> : <Menu />}
          </button>

        </div>

      </header>


      {/* ======================================
          HERO
      ====================================== */}

      <section className="hero">

        <div className="wrap heroText">

          <span>
            ABES ENGINEERING COLLEGE
          </span>


          <h1>
            Engineering minds.
            <br />
            <em>Creating tomorrow.</em>
          </h1>


          <p>
            A modern digital campus experience for
            learning, innovation, careers and student
            support.
          </p>


          <div>

            <button
              className="gold"
              onClick={() =>
                document
                  .getElementById("academics")
                  ?.scrollIntoView()
              }
            >
              Explore Programs
              <ArrowRight />
            </button>


            <button
              className="outline"
              onClick={() => setChat(true)}
            >
              Ask AI Assistant
            </button>

          </div>

        </div>

      </section>


      {/* ======================================
          STATISTICS
      ====================================== */}

      <section className="stats">

        <div className="wrap statgrid">

          {[
            ["10,000+", "Students"],
            ["500+", "Faculty"],
            ["100+", "Recruiters"],
            ["25+", "Years"],
            ["50+", "Programs"],
          ].map(([number, title]) => (

            <div key={title}>

              <b>{number}</b>

              <span>{title}</span>

            </div>

          ))}

        </div>

      </section>


      {/* ======================================
          ABOUT
      ====================================== */}

      <section
        className="section"
        id="about"
      >

        <div className="wrap intro">

          <div>

            <label>
              ABOUT THE COLLEGE
            </label>

            <h2>
              A campus built for ambitious learners.
            </h2>

          </div>


          <p>
            ABES Engineering College is presented
            here through an original demonstration
            interface designed for a student-support
            platform. The site combines academics,
            admissions, careers, research and an
            AI assistant.
          </p>

        </div>

      </section>


      {/* ======================================
          ACADEMICS
      ====================================== */}

      <section
        className="section light"
        id="academics"
      >

        <div className="wrap">

          <label>
            ACADEMICS
          </label>

          <h2>
            Programs that prepare you for the future.
          </h2>


          <div className="cards">

            {programs.map(
              ([degree, title, description]) => (

                <article key={title}>

                  <small>
                    {degree}
                  </small>

                  <h3>
                    {title}
                  </h3>

                  <p>
                    {description}
                  </p>

                  <a href="#academics">
                    Explore
                    <ArrowRight size={15} />
                  </a>

                </article>

              )
            )}

          </div>

        </div>

      </section>


      {/* ======================================
          ADMISSIONS
      ====================================== */}

      <section
        className="section dark"
        id="admissions"
      >

        <div className="wrap banner">

          <div>

            <label>
              ADMISSIONS
            </label>

            <h2>
              Your journey starts here.
            </h2>

            <p>
              Explore programs, eligibility,
              application information and
              important dates.
            </p>

          </div>


          <button className="gold">
            Explore Admissions
            <ArrowRight />
          </button>

        </div>

      </section>


      {/* ======================================
          PLACEMENTS
      ====================================== */}

      <section
        className="section"
        id="placements"
      >

        <div className="wrap">

          <label>
            PLACEMENTS
          </label>

          <h2>
            From classroom to career.
          </h2>


          <div className="placement">

            {[
              ["1200+", "Offers"],
              ["45 LPA", "Highest Package"],
              ["80%", "Placement Rate"],
              ["300+", "Recruiting Partners"],
            ].map(([number, title]) => (

              <div key={title}>

                <b>{number}</b>

                <span>{title}</span>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ======================================
          CAMPUS LIFE
      ====================================== */}

      <section
        className="section light"
        id="campus"
      >

        <div className="wrap">

          <label>
            CAMPUS LIFE
          </label>

          <h2>
            Learn beyond the classroom.
          </h2>


          <div className="features">


            {[
              [GraduationCap, "Student Clubs"],
              [BookOpen, "Library & Learning"],
              [FlaskConical, "Research Labs"],
              [Users, "Student Community"],
            ].map(([Icon, title]) => (

              <div key={title}>

                <Icon />

                <h3>
                  {title}
                </h3>

                <p>
                  Facilities and activities designed
                  for an active campus experience.
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ======================================
          RESEARCH
      ====================================== */}

      <section
        className="section research"
        id="research"
      >

        <div className="wrap">

          <label>
            RESEARCH & INNOVATION
          </label>

          <h2>
            Ideas into impact.
          </h2>

          <p>
            Showcase innovation cells,
            laboratories, publications,
            patents and student projects here.
          </p>

        </div>

      </section>


      {/* ======================================
          FOOTER
      ====================================== */}

      <footer>

        <div className="wrap foot">

          <div>

            <h2>
              ABES
            </h2>

            <p>
              Engineering College
            </p>

          </div>


          <div>

            <b>
              Explore
            </b>

            <a href="#academics">
              Academics
            </a>

            <a href="#admissions">
              Admissions
            </a>

            <a href="#placements">
              Placements
            </a>

          </div>


          <div>

            <b>
              Support
            </b>

            <a href="#campus">
              Student Portal
            </a>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setChat(true);
              }}
            >
              AI Student Support
            </a>

            <a href="#about">
              Contact
            </a>

          </div>

        </div>


        <div className="copy">

          © 2026 ABES Engineering College —
          Student project prototype

        </div>

      </footer>


      {/* ======================================
          FLOATING AI BUTTON
      ====================================== */}

      <button
        className="float"
        onClick={() => setChat(true)}
      >

        <MessageCircle />

        <span>
          Ask AI
        </span>

      </button>


      {/* ======================================
          AI CHAT WINDOW
      ====================================== */}

      {chat && (

        <div className="chat">

          <div className="chatbox">


            {/* CHAT HEADER */}

            <div className="chathead">

              <div>

                <Sparkles />

                <b>
                  ABES AI Student Assistant
                </b>

              </div>


              <button
                onClick={() => setChat(false)}
              >
                <X />
              </button>

            </div>


            {/* MESSAGES */}

            <div className="messages">

              {msgs.map((message, index) => (

                <div
                  key={index}
                  className={
                    message.r === "u"
                      ? "user"
                      : "assistant"
                  }
                >
                  {message.t}
                </div>

              ))}

            </div>


            {/* SUGGESTED QUESTIONS */}

            <div className="chips">

              {[
                "What programs are offered?",
                "Admission information",
                "Tell me about placements",
              ].map((question) => (

                <button
                  key={question}
                  onClick={() => send(question)}
                >
                  {question}
                </button>

              ))}

            </div>


            {/* MESSAGE INPUT */}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
            >

              <input
                value={q}
                onChange={(e) =>
                  setQ(e.target.value)
                }
                placeholder="Ask about ABES..."
              />


              <button type="submit">
                <Send />
              </button>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}


// ========================================
// RENDER APP
// ========================================

createRoot(
  document.getElementById("root")
).render(
  <App />
);