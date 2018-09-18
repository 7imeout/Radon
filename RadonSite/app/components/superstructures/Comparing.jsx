import React from 'react';
import './Tutorial.css';
import './Superstructures.css';
import Header from '../Header.jsx';
import Footer from '../Footer.jsx';
import {Link} from 'react-router-dom';
import {NoteManager, Note, NoteAnchor, NotesHeader} from '../Note.jsx';
import SuperstructuresTOC from './SuperstructuresTOC.jsx';

const cssns = (classes) => "c-sscomparing m-superstructures m-tutorial " + (classes || "");

const incode = (code) => <span className={cssns("inline-code")}>{code}</span>

class SuperstructuresComparing extends React.Component {
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

                <h1 className={cssns("noline")}>Superstructures Guide: Comparing</h1>
                <div className={cssns("content")}>
                  As we saw in <Link to="/superstructures/snapshots">Snapshots</Link>, we can keep superstructures' old versions' data around in memory.
                </div>
                <div className={cssns("content")}>
                  Radon gives us a way to easily compare two versions, to get the difference.
                </div>

                <h3 className={cssns("cozy")}>What can comparing be used for?</h3>

                <ul className={cssns("cozy")}>
                  <li className={cssns()}>Revision history; display the differences between an old version and this one.</li>
                  <li className={cssns()}>Debugging; it's easy to see how the superstructure has changed.</li>
                </ul>

                <h3>Comparing in Action</h3>

                <div className={cssns("content")}>
                  In the <Link to="/superstructures/intro">intro</Link>, we made a superstructure that contained some planets, some moons, and an astronaut, shown below. Here, we'll take a snapshot, do some modifications, and print the difference.
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
            Moon("Luna", 1737)))),
      List()));

let snapshot1 = mySS.snapshot();

mySS.root.astronauts.add(
  Astronaut(
    "Raynor",
    &mySS.root.planets.0));

mySS.root.planets.0.moons.0.name = "Jim";

doutln diff(snapshot1, mySS);`}
  </div>
                  </div>
                </div>

                <div className={cssns("content cozy")}>
                  The above {incode("diff")} call gave us this output:
                </div>

                <div className={cssns("content")}>
  <div className={cssns("code")}>
{`Diff:MySuperstructure(
  List(),
  List(&Astronaut#13),
  Map(
    [2, List(ListAddEffect:Astronaut(2, 13))],
    [1, List(ReplaceEffect:(Moon, String, 0)(1, "Jim"))))]`}
  </div>
                </div>

                <div className={cssns("content")}>
                  Let's talk about the {incode("Diff")} struct.
                </div>

                <h3>The Diff Struct</h3>

                <div className={cssns("content")}>
                  {incode("Diff")} is a struct template that looks something like this:
                </div>

                <div className={cssns("content")}>
  <div className={cssns("code")}>
{`struct Diff:MySuperstructure {
  onlyInLeft: List:&IMember:MySuperstructure;`} <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="noteIMember"/>{`
  onlyInRight: List:&IMember:MySuperstructure;
  changes: Map:(Int, IEffect:MySuperstructure);
}`}
  </div>
                </div>

                <div className={cssns("content")}>
                  Some notes about the below explanation:
                  <ul className={cssns()}>
                    <li className={cssns()}>
                      {incode("left")} means "the left argument to diff", in our case, {incode("snapshot1")}.
                    </li>
                    <li className={cssns()}>
                      {incode("right")} means "the right argument to diff", in our case, {incode("mySS")}.
                    </li>
                  </ul>
                </div>

                <div className={cssns("content")}>
                  Now, let's demystify this Diff struct:
                  <ul className={cssns()}>
                    <li className={cssns()}>{incode("onlyInLeft")} contains references to things in {incode("left")}, which aren't in {incode("right")}.</li>
                    <li className={cssns()}>{incode("onlyInRight")} contains references to things in {incode("right")}, which aren't in {incode("left")}.</li>
                    <li className={cssns()}>{incode("changes")} contains all the effects that, if applied to {incode("left")}, would result in {incode("right")}. It is a map whose keys are the IDs of the objects in the superstructure being affected.</li>
                  </ul>
                </div>

                <h3 className={cssns()}>Diff Options</h3>

                <div className={cssns("content")}>
                  {incode("diff")} has a third argument called {incode("useEffects")}.
                  <ul className={cssns()}>
                    <li className={cssns()}>By default, it's <strong>true</strong>, which means the diff will be calculated using the internal list of effects between {incode("left")} and {incode("right")}.</li>
                    <li className={cssns()}>When <strong>false</strong>, it will calculate the difference using the contents of {incode("left")} and {incode("right")}. <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="noteContents"/></li>
                  </ul>
                  Using <strong>false</strong> could be faster if, for example, there's a piece of data which is repeatedly updated over and over between snapshots.
                </div>
                <div className={cssns("content")}>
                  
                </div>

              </div>
            </div>

            <div className={cssns("margin")}>
              <div className={cssns("toc-container")}>
                <SuperstructuresTOC page="comparing"/>
                <div className={cssns("notes-header")}>
                  <NotesHeader update={this.updateNotesHeaderRect}/>
                </div>
              </div>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="noteIMember">
                Every struct in our superstructure automatically {incode("isa IMember:MySuperstructure")}.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="noteContents">
                Comparing contents can also be very fast, because snapshots share a lot of data under the hood.
              </Note>
            </div>
          </div>

        </div>
        <Footer/>
      </div>
    );
  }
}

export default SuperstructuresComparing;
