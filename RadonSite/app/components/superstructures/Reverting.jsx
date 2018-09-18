import React from 'react';
import './Tutorial.css';
import './Superstructures.css';
import Header from '../Header.jsx';
import Footer from '../Footer.jsx';
import {Link} from 'react-router-dom';
import {NoteManager, Note, NoteAnchor, NotesHeader} from '../Note.jsx';
import SuperstructuresTOC from './SuperstructuresTOC.jsx';

const cssns = (classes) => "c-ssreverting m-tutorial m-superstructures " + (classes || "");

const incode = (code) => <span className={cssns("inline-code")}>{code}</span>

class SuperstructuresReverting extends React.Component {
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

                <h1 className={cssns("noline")}>Superstructures Guide: Reverting</h1>
                <div className={cssns("content")}>
                  In the <Link to="/superstructures/intro">References</Link> page, we made a superstructure that contained some planets, some moons, and an astronaut, shown below. This page will show how to revert to past versions of this data.
                </div>

                <div className={cssns("content splitter")}>
                  <div className={cssns("half")}>

  <div className={cssns("code")}>
{`superstructure MySuperstructure {
  root struct SolarSystem {
    planets: List:Planet;
    astronauts: List:Astronaut;
  }
  struct Planet {
    name: Str;
    moons: List:Moon;
  }
  struct Moon {
    name: Str;
    radius: Int;
  }
  struct Astronaut {
    name: Str;
    planet: &Planet;
  }
}`}
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
            Moon("Luna", 1737)))
        Planet(
          "Saturn",
          List(
            Moon("Titan", 2576),
            Moon("Mimas", 562)))),
      List()));

mySS.root.astronauts.add(
  Astronaut(
    "Raynor",
    &mySS.root.planets.1));
 `}
  </div>
                  </div>
                </div>

                <h3 className={cssns()}>Enabling Reverting</h3>

                <div className={cssns("code-on-right")}>
                  <div className={cssns("content splitter")}>
                    <div className={cssns("half")}>
                      <div className={cssns("content")}>First, we enable history on our superstructure with {incode("History")} and {incode("Revertible")}.</div>
                      <div className={cssns("content end")}>The {incode("@Revertible(true);")} enables reverting.</div>
                    </div>

                    <div className={cssns("half")} style={{float: "right", clear: "both"}}>
  <div className={cssns("code")}>
{`superstructure MySuperstructure {
  @History(Linear);`} <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="note0"/> <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="note0.5"/>{`
  @Revertible(true);

  root struct SolarSystem {
...`}
  </div>
                    </div>
                  </div>
                </div>

                <div className={cssns("content")}>Revertibility requires history, so the {incode("@History(Linear);")} instructs the compiler to keep track of changes. See <Link to="/superstructures/annotations">Superstructure Settings</Link> for other history options.</div>

                <h3 className={cssns()}>Using It</h3>

                <div className={cssns("content")}>
                  Let's hold onto a version number, do some changes, and then revert those changes.
                </div>

                <div className={cssns("code-on-right")}>
                  <div className={cssns("content splitter")}>
                    <div className={cssns("half")}>
                      We can get the version number of our superstructure using {incode("v.version")}. <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="note1"/> <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="note1.5"/>
                    </div>

                    <div className={cssns("half")} style={{float: "right", clear: "both"}}>
  <div className={cssns("code")}>
{`let firstVersion = v.version(mySS);`}
  </div>
                    </div>
                  </div>

                  <div className={cssns("content splitter")}>
                    <div className={cssns("half")}>
                      Then, let's add another planet, Pluto, and make the astronaut's {incode("planet")} field point to it.
                    </div>

                    <div className={cssns("half")}>
  <div className={cssns("code")}>
{`mySS.root.planets.add(
  Planet(
    "Pluto",
    List(
      Moon("Charon", 606700))));

mySS.root.astronauts.0.planet =
  &mySS.root.planets.2;
`}
  </div>
                    </div>
                  </div>

                  <div className={cssns("content splitter")}>
                    <div className={cssns("half")}>
                      Then, let's revert the entire superstructure back to the previous version, using {incode("v.revert")}.
                    </div>
                    <div className={cssns("half")}>
  <div className={cssns("code")}>
{`v.revert(mySS, firstVersion);`} <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="note2"/>
  </div>
                    </div>
                  </div>
                </div>

                <div className={cssns("content")}>
                  Suddenly, Pluto's gone, and the astronaut's {incode("planet")} field is pointing to Saturn, like it was before!
                </div>

                <div className={cssns("content")}>
                  See <Link to="/playground">the full code here</Link>.
                </div>

                <h3 className={cssns("cozy")}>What can we use reverting for?</h3>

                <div className={cssns("content")}>
                  <ul className={cssns()}>
                    <li className={cssns()}>Undo history, for example in Photoshop.</li>
                    <li className={cssns()}>Saves in a video game.</li>
                    <li className={cssns()}>Restoring to the last good state after errors.</li>
                  </ul>
                </div>

                <h3 className={cssns("cozy")}>Keep in mind...</h3>

                <div className={cssns("content cozy")}>
                  <ul className={cssns()}>
                    <li className={cssns()}>
                      We can speed up reverting to <strong>constant time</strong> by changing the superstructure's history setting to <Link to="/superstructures/formats">chronotree</Link> or <Link to="/superstructures/formats">chronobase</Link>. <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="note3"/>
                    </li>
                    <li className={cssns()}>
                      The strong reference rules apply, just like anywhere in Radon. Anything pointed at by a strong reference cannot be deleted in a revert. <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="note4"/>
                    </li>
                  </ul>
                </div>

                <div className={cssns("line")}/>

                <div className={cssns("content")}>
                  In the next page, we see how to read data from past versions: Snapshots!
                </div>

                <div className={cssns("content")} style={{textAlign: "right"}}>
                  <strong>Next:</strong> <a href="/superstructures/snapshots">Snapshots</a>
                </div>
              </div>
            </div>

            <div className={cssns("margin")}>
              <div className={cssns("toc-container")}>
                <SuperstructuresTOC page="reverting"/>
                <div className={cssns("notes-header")}>
                  <NotesHeader update={this.updateNotesHeaderRect}/>
                </div>
              </div>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="note1">
                {incode("v.version")} is a built-in function.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="note1.5">
                If we had {incode("using v;")} at the top of the file, then we could call {incode("version")} without the {incode("v.")} in front.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="note2">
                {incode("v.revert")} is a built-in function.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="note3">
                See <Link to="/superstructures/formats">history settings</Link> for more.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="note4">
                For example, if we said {incode("let x = &mySS.root.planets.2")} before the {incode("v.revert")} call, the program would have halted.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="note0">
                These are annotations, like in Java. Unlike Java, these apply to the containing thing (the superstructure), not the following thing (the struct).
              </Note>
              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="note0.5">
                These are assuming we have {incode("using v;")} above, otherwise it would be {incode("@v.History(v.Linear)")} and {incode("@v.Revertible(true)")}.
              </Note>
            </div>
          </div>

        </div>
        <Footer/>
      </div>
    );
  }
}

export default SuperstructuresReverting;
