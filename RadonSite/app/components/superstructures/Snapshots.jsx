import React from 'react';
import './Tutorial.css';
import './Superstructures.css';
import Header from '../Header.jsx';
import Footer from '../Footer.jsx';
import {Link} from 'react-router-dom';
import {NoteManager, Note, NoteAnchor, NotesHeader} from '../Note.jsx';
import SuperstructuresTOC from './SuperstructuresTOC.jsx';

const cssns = (classes) => "c-sssnapshots m-tutorial m-superstructures " + (classes || "");

const incode = (code) => <span className={cssns("inline-code")}>{code}</span>

class SuperstructuresSnapshots extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.noteManager = new NoteManager(this);

    this.updateNoteAnchorPosition = (...args) => this.noteManager.updateNoteAnchorPosition(...args);
    this.updateNoteSize = (...args) => this.noteManager.updateNoteSize(...args);
    this.updateNotesHeaderRect = (...args) => this.noteManager.updateNotesHeaderRect(...args);
  }

  componentDidUpdate(prevProps, prevState) {
    this.noteManager.componentDidUpdate();
  }

  render() {
    return (
      <div className={cssns("root")}>
        <Header/>

        <div className={cssns("page")}>

          <div className={cssns("columns")}>

            <div className={cssns("left")}>
              <div className={cssns("main")}>

                <h1 className={cssns("noline")}>Superstructures Guide: Snapshots</h1>
                <div className={cssns("content")}>
                  Radon not only has a way to revert our superstructure to a past version, but it also lets us read that data without reverting.
                </div>
                <div className={cssns("content")}>
                  At any time, we can make a <strong>snapshot</strong> of our superstructure, and from then on, we can read it and query it.
                </div>
                <div className={cssns("content")}>
                  One would assume it's extremely expensive to take a copy like this, but thanks to the underlying <Link to="/superstructures/chronobase">chronobase</Link>, <strong>this operation is free</strong>.
                </div>

                <h3 className={cssns("cozy")}>What can we use snapshots for?</h3>

                <ul className={cssns("cozy")}>
                  <li className={cssns()}>Make graphs over time of how your data has evolved.</li>
                  <li className={cssns()}>Pipelining; one part of your application can use a "good" version of the data while the rest of your application builds the next version.</li>
                  <li className={cssns()}>Since theyre immutable, we can send them across thread boundaries at will. This is incredibly powerful when combined with <Link to="/superstructures/forking">Forking</Link> and <Link to="/superstructures/synchronization">Synchronization</Link>.</li>
                </ul>

                <h3>Snapshotting in Action</h3>

                <div className={cssns("content")}>
                  Below is a superstructure that contained some planets and moons. This page will show how to make snapshots, and what they look like.
                </div>

                <div className={cssns("content splitter")}>
                  <div className={cssns("half")}>

  <div className={cssns("code")}>
{`superstructure MySuperstructure {
  root struct SolarSystem {
    planets: List:Planet;
  }
  struct Planet {
    name: Str;
    moons: List:Moon;
  }
  struct Moon {
    name: Str;
    radius: Int;
  }
}

`}
  </div>
                  </div>
                  <div className={cssns("half")}>
  <div className={cssns("code")}>
{`let mySS =
  MySuperstructure(
    SolarSystem(
      List(
        Planet(
          "Earth",
          List(
            Moon("Luna", 1737))))));

let snapshot1 = mySS.snapshot();`} <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="note1"/>{`

mySS.root.planets.0.moons.add(
  Moon("Raine", 898));

let snapshot2 = mySS.snapshot();

doutln snapshot1;
doutln snapshot2;`}
  </div>
                  </div>
                </div>

                <div className={cssns("content cozy")}>
                  The above code outputs:
                </div>

                <div className={cssns("content")}>
                  <div className={cssns("code")}>
{`MySuperstructure(
  SolarSystem#5(
    List#4(Planet#3("Earth", List#2(Moon#1("Luna", 1737))))))
MySuperstructure(
  SolarSystem#5(
    List#4(
      Planet#3(
        "Earth",
        List#2(
          Moon#1("Luna", 1737),
          Moon#6("Raine", 898))))))`}
                  </div>
                </div>

                <div className={cssns("content cozy")}>
                  We can read and query the snapshot the same way we can read and query the live instance:
                </div>

                <div className={cssns("content cozy")}>
                  <div className={cssns("code")}>
{`doutln mySS.findAll:Moon();`} <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="note2"/>{`
doutln snapshot1.findAll:Moon();`}
                  </div>
                </div>

                <div className={cssns("content cozy")}>
                  The above code outputs:
                </div>

                <div className={cssns("content")}>
                  <div className={cssns("code")}>
{`List()
List(Moon#6("Raine", 898))`}
                  </div>
                </div>

                <h3 className={cssns("cozy")}>Keep in mind...</h3>

                <ul className={cssns()}>
                  <li className={cssns()}>Chronobases store snapshots extremely efficiently; the only additional memory used is what has changed since the last version. Still, a regular computer can't handle billions of snapshots. Keep an eye on memory usage.</li>
                  <li className={cssns()}>For Chronobase, snapshots are free, but for Linear, they are O(n).</li>
                </ul>

                <div className={cssns("line")}/>

                <div className={cssns("content")}>
                  In the next page, we see how to compare data from different versions or snapshots.
                </div>

                <div className={cssns("content")} style={{textAlign: "right"}}>
                  <strong>Next:</strong> <a href="/superstructures/comparing">Comparing</a>
                </div>
              </div>
            </div>

            <div className={cssns("margin")}>
              <div className={cssns("toc-container")}>
                <SuperstructuresTOC page="snapshots"/>
                <div className={cssns("notes-header")}>
                  <NotesHeader update={this.updateNotesHeaderRect}/>
                </div>
              </div>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="note1">
                {incode("snapshot()")} is a built-in function.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="note2">
                {incode("mySS.findAll:Moon()")} is calling the {incode("findAll")} function with a template argument of {incode("Moon")}. In another language this might look like {incode("mySS.findAll<Moon>()")}.
              </Note>

              {/*
              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="note1">
                {incode("addEffectObserver")} actually takes an IEffectObserver. Radon automatically converted our lambda to that interface.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="note2">
                Depending on the superstructure's settings, the IDs might not be sequential integers, but instead random UUIDs.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="note3">
                {incode("{ doutln _; }")} is the same as {incode("{(x) doutln x; }")} or even just {incode("doutln")} in this case, see <Link to="/basics/calling">Calling</Link> for more.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="note4">
                The MySuperstructure owns the List:Astronaut which owns the Astronaut.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="note5">
                <p>Here, the hidden {incode("v.id")} field is shown. This is automatically added to superstructures' members by Radon.</p>
                <p>{incode("v.id")} is indeed the name of this field. {incode("v.id")} is a symbol, defined in namespace {incode("v")}. This way, you can have your own {incode("id")} field which doesn't collide.</p>
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="note6">
                This is a simplified {incode("ListAppendEffect")} struct. The actual one has much more, see the <Link to="/reference/superstructures">reference</Link>.
              </Note>

              */}
            </div>
          </div>

        </div>
        <Footer/>
      </div>
    );
  }
}

export default SuperstructuresSnapshots;
