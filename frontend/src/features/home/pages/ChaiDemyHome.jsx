import React from "react";
import MiniCard from "../components/MiniCard";
import CourseCard from "../components/CourseCard";
import SectionTitle from "../components/SectionTitle";

const ChaiDemyHome = () => {
  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-[var(--chai-light)]
        via-[var(--chai-mid)]
        to-[var(--chai-deep)]
        text-[var(--chai-text)]
      "
    >
      {/* HERO SECTION */}
      <section className="max-w-screen-xl mx-auto px-8 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <div
            className="
              inline-flex items-center gap-2
              bg-[var(--chai-mid)]/60 border border-[var(--chai-border)]
              px-3 py-1 rounded-full text-sm
            "
          >
            <span className="w-2 h-2 bg-green-600 rounded-full"></span>
            Late-night learners welcome
          </div>

          <h2 className="text-4xl md:text-5xl font-bold leading-tight mt-4">
            Brew your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--chai-brown)] to-[var(--chai-dark)]">
              skills
            </span>{" "}
            with a cup of chai.
          </h2>

          <p className="text-[var(--chai-muted)] mt-4 max-w-lg">
            chaiDemy is your cozy LMS where focus sessions, micro lessons, and
            chai breaks blend into the perfect study ritual.
          </p>

          <div className="flex gap-4 mt-6">
            <button className="btn-chai-primary">Start Studying</button>
            <button className="btn-chai-soft">Browse Courses</button>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-10">
            <div>
              <h3 className="text-xl font-bold">12k+</h3>
              <p className="text-sm text-[var(--chai-muted)]">
                Active learners
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold">850+</h3>
              <p className="text-sm text-[var(--chai-muted)]">Lessons brewed</p>
            </div>
            <div>
              <h3 className="text-xl font-bold">92%</h3>
              <p className="text-sm text-[var(--chai-muted)]">
                Completion rate
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT HERO CARD */}
        <div
          className="
            bg-[var(--chai-cream)]/80 border border-[var(--chai-border)]
            rounded-xl p-6 shadow-xl relative
          "
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--chai-muted)]">
                Current Session
              </p>
              <h3 className="font-semibold">DSA with Masala Chai</h3>
            </div>
            <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700 border border-green-400">
              On track
            </span>
          </div>

          <div className="my-4">
            <div className="w-full h-2 bg-white rounded-full">
              <div
                className="
                  h-full w-[68%]
                  bg-gradient-to-r from-[var(--chai-brown)] to-[var(--chai-dark)]
                  rounded-full
                "
              ></div>
            </div>
            <div className="flex justify-between text-xs text-[var(--chai-muted)] mt-1">
              <span>Chapter 4 · Graphs</span>
              <span>68%</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <MiniCard
              title="Focus Timer"
              value="25:00"
              sub="Chai break after"
            />
            <MiniCard
              title="Chai Streak"
              value="7 days"
              sub="Don't break the chain ☕"
            />
          </div>

          <div className="flex items-center gap-3 mt-6 text-xs text-[var(--chai-muted)]">
            <span className="text-lg">☕</span>
            Tip: Keep your notes warm & your chai warmer.
          </div>
        </div>
      </section>

      {/* COURSES SECTION */}
      <SectionTitle
        title="Popular Courses"
        subtitle="Made for exam warriors & night coders"
      />

      <div
        id="courses"
        className="max-w-screen-xl mx-auto px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {[
          {
            level: "Beginner",
            title: "JavaScript Basics with Cutting Chai",
            lessons: "32 lessons",
            time: "6h 20m",
            tag: "Frontend",
          },
          {
            level: "Intermediate",
            title: "DSA: Masala Edition",
            lessons: "48 lessons",
            time: "11h 05m",
            tag: "Algorithms",
          },
          {
            level: "Advanced",
            title: "System Design Night Owl",
            lessons: "25 lessons",
            time: "9h 10m",
            tag: "Backend",
          },
          {
            level: "All Levels",
            title: "Deep Work Rituals",
            lessons: "18 lessons",
            time: "4h 45m",
            tag: "Productivity",
          },
        ].map((course, i) => (
          <CourseCard key={i} {...course} />
        ))}
      </div>

      {/* FOOTER */}
    </div>
  );
};

export default ChaiDemyHome;
