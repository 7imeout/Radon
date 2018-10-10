import React from 'react';
import '../../Tutorial.css';
import './Superstructures.css';
import Header from '../../Header.jsx';
import Footer from '../../Footer.jsx';
import {Link} from 'react-router-dom';
import {NoteManager, Note, NoteAnchor, NotesHeader} from '../../Note.jsx';
import SuperstructuresTOC from './SuperstructuresTOC.jsx';

const cssns = (classes) => "c-sseffects m-tutorial m-superstructures " + (classes || "");

const incode = (code) => <span className={cssns("inline-code")}>{code}</span>

class SuperstructuresEffects extends React.Component {
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

                <h1 className={cssns("noline")}>Superstructures Guide: Effects</h1>
                <div className={cssns("content")}>
                  Radon gives us an easy way to observe arbitrary changes to superstructures.
                </div>
                <div className={cssns("content")}>
                  Every time something in a superstructures changes, it broadcasts an <strong>effect</strong> to all observers.
                </div>

                <h3 className={cssns("cozy")}>What can we use effects for?</h3>

                <ul className={cssns("cozy")}>
                  <li className={cssns()}>Keeping state outside the superstructure in sync with it.</li>
                  <li className={cssns()}>Debugging; it's easy to see all changes coming into a superstructure.</li>
                  <li className={cssns()}>Sending updates across threads.</li>
                </ul>

                <h3>Listening for Effects</h3>

                <div className={cssns("content")}>
                  In the <Link to="/superstructures/intro">intro</Link>, we made a superstructure that contained some planets and moons. This page will show how to listen for effects, and what they look like.
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
            Moon("Luna", 1737)))
        Planet(
          "Saturn",
          List(
            Moon("Titan", 2576),
            Moon("Mimas", 562))))));

mySS.addAfterEffectObserver(
  { doutln _; });

mySS.root.planets.append(
  Planet("Char", List()));`}
  </div>
                  </div>
                </div>

                <div className={cssns("content")}>
                  Note the new line {incode("mySS.addAfterEffectObserver({ doutln _; });")} in the above code, explained here:
                  <ul className={cssns()}>
                    <li className={cssns()}>{incode("{ some code here }")} is a <strong>lambda</strong>, in other words, a function. <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="0"/></li>
                    <li className={cssns()}>{incode("_")}, inside a lambda, means "the argument".</li>
                    <li className={cssns()}>So, {incode("{ doutln _; }")} is a function that gives "the argument" to doutln. <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="equiv"/></li>
                    <li className={cssns()}>We then gave that lambda to {incode("addAfterEffectObserver")}. Now our lambda will be called whenever anything in our superstructure changes. <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="1"/></li>
                  </ul>
                </div>

                <h3>Anatomy of an Effect</h3>

                <div className={cssns("content cozy")}>
                  That observer was called twice, and gave us this output:
                </div>

                <div className={cssns("content")}>
  <div className={cssns("code")}>
{`CreateEffect:List:Moon(11, Flat:List:Moon(List()))`}<NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="Flat"/>{`
CreateEffect:Planet(12, Flat:Planet("Char", 11))
ListAppendEffect:Planet(2, 12)`}
  </div>
                </div>

                <div className={cssns("content")}>
                  There's three interesting structs in play here: {incode("Flat")}, {incode("CreateEffect")}, and {incode("ListAppendEffect")}. First, let's talk about the {incode("Flat")} struct.
                </div>

                <h3>The Flat Struct</h3>

                <div className={cssns("content splitter")}>
                  {incode("Flat")} is a special struct template which substitutes IDs for references.
                </div>

                <div className={cssns("content cozy")}>
                  On the left is a regular Moon, on the right is a Flat:Moon.
                </div>

                <div className={cssns("content cozy splitter")}>
                  <div className={cssns("half")}>
  <div className={cssns("code")}>
{`struct Moon {
  name: Str;
  planet: &Planet;
}`}
  </div>
                  </div>
                  <div className={cssns("half")}>
  <div className={cssns("code")}>
{`struct Flat:Moon {
  name: Str;
  planet: Int;
}`}
  </div>
                  </div>
                </div>
                <div className={cssns("content")}>
                  Note that {incode("planet")} is an {incode("Int")} in the {incode("Flat:Moon")}.
                </div>

                <h3>CreateEffect</h3>

                <div className={cssns("content splitter")}>
                  <div className={cssns()}>
                    {incode("CreateEffect")} is an effect that makes a new object inside the superstructure. See right for a rough idea of what it looks like.
                  </div>
                  <div className={cssns()}>
  <div className={cssns("code")}>
{`struct CreateEffect:T isa`}<NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="Isa"/>{` IEffect`}<NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="IEffect"/>{` {
  objectId: Int;
  data: Flat:T;
}`}
  </div>
                  </div>
                </div>

                <div className={cssns("content")}>
                  A {incode("CreateEffect")} does not attach it to any particular place in the superstructure; it just creates it.
                </div>

                <div className={cssns("content")}>
                  These are always followed by something that puts it in the right place, such as the {incode("ListAppendEffect")} below.
                </div>

                <h3>ListAppendEffect</h3>

                <div className={cssns("content splitter")}>
                  <div className={cssns()}>
                    {incode("ListAppendEffect")} is an effect that moves an object to the end of a List. See right for a rough idea of what it looks like.
                  </div>
                  <div className={cssns()}>
  <div className={cssns("code")}>
{`struct ListAppendEffect isa IEffect {
  listId: Int;
  memberId: Int;
}`}
  </div>
                  </div>
                </div>

                <div className={cssns("content")}>
                  We appended into a {incode("List:Moon")}. Since {incode("List:Moon")} owns its Moons, this effect <strong>moves</strong> the Moon from wherever it previously was. <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="Move"/>
                </div>

                <h3>Applying an Effect</h3>

                <div className={cssns("content")}>
                  We can construct an effect on our own and give it to the superstructure, to enact the change it represents.
                </div>

                <div className={cssns("content code")}>
{`let myEffect = ListAppendEffect(6, 11)`}
                </div>

                <div className={cssns("line")}/>

                <div className={cssns("content")}>
                  In the next page, we learn how to guarantee data consistency in our superstructures.
                </div>

                <div className={cssns("content")} style={{textAlign: "right"}}>
                  <strong>Next:</strong> <a href="/superstructures/constraints">Constraints</a>
                </div>

              </div>
            </div>

            <div className={cssns("margin")}>
              <div className={cssns("toc-container")}>
                <SuperstructuresTOC page="effects"/>
                <div className={cssns("notes-header")}>
                  <NotesHeader update={this.updateNotesHeaderRect}/>
                </div>
              </div>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="0">
                See <Link to="/basics/lambdas">Lambdas</Link> for more.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="1">
                {incode("addAfterEffectObserver")} actually takes an IAfterEffectObserver interface instance. Radon automatically converted our lambda to an instance of new subclass of that interface.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="IEffect">
                {incode("IEffect")} has another template argument, left out in this page for brevity. See the <Link to="/reference/IEffect">IEffect</Link> for more.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="Isa">
                {incode("isa")} means "is a subclass of". Here, it means this CreateEffect is a subclass of IEffect.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="Move">
                If we instead appended into a {incode("List:&Moon")}, we would just be adding a reference to the Moon.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="Flat">
                Flat actually has two template arguments, and would look like {incode("Flat:(Moon, Int)")} (there's an extra template argument for the kind of ID) but that's left out in this page for brevity.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="equiv">
                {incode("{ doutln _; }")} is equivalent to {incode("{(x) doutln x;}")}.
              </Note>


{/*
              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="2">
                Depending on the superstructure's settings, the IDs might not be sequential integers, but instead random UUIDs.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="3">
                {incode("{ doutln _; }")} is the same as {incode("{(x) doutln x; }")} or even just {incode("doutln")} in this case, see <Link to="/basics/calling">Calling</Link> for more.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="4">
                The MySuperstructure owns the List:Moon which owns the Moon.
              </Note>*/}
            </div>
          </div>

        </div>
        <Footer/>
      </div>
    );
  }
}

export default SuperstructuresEffects;
