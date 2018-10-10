import React from 'react';
import Header from '../Header.jsx';
import Footer from '../Footer.jsx';
import {NoteManager, Note, NoteAnchor, NotesHeader} from '../Note.jsx';
import {Link} from 'react-router-dom';
import '../Tutorial.css';

const cssns = (classes) => "c-ssintro m-tutorial m-superstructures " + (classes || "");

const incode = (code) => <span className={cssns("inline-code")}>{code}</span>

class Deterministic extends React.Component {
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

                <h1 className={cssns("noline")}>Determinism</h1>
                <div className={cssns("content cozy")}>
                  With Radon, you can enforce that blocks of code are <strong>deterministic</strong>, and eliminate an entire class of bugs in one fell swoop.
                </div>

                <h3 className={cssns()}>What's Determinism?</h3>
                <div className={cssns("content cozy")}>
                  A deterministic function, like {incode("fn add(x: Int, y: Int) { x + y }")}, means that given the same inputs, it will always produce the same output.
                </div>
                <div className={cssns("content cozy")}>
                  A nondeterministic function, like {incode("fn getInput(stdin) { stdin.readline() }")}, might return different things every time we run the function.
                </div>
                <div className={cssns("content cozy")}>
                  Here are some nondeterministic operations:
                  <ul className={cssns("cozy")}>
                    <li className={cssns()}>User input (such as mouse or keyboard),</li>
                    <li className={cssns()}>Reading from files,</li>
                    <li className={cssns()}>Reading from the network,</li>
                    <li className={cssns()}>Calls to rand(),</li>
                    <li className={cssns()}>Floating point operations, <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="noteFloat"/></li>
                    <li className={cssns()}>Casting pointers to integers, <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="noteCasting"/></li>
                    {/*<li className={cssns()}>Calls out to native code,</li>*/}
                    <li className={cssns()}>Reading a result from a nondeterministically scheduled thread.</li>
                  </ul>
                </div>
                <div className={cssns("content cozy")}>
                  Most of the time we don't think about determinism, so it's easy to accidentally do something nondeterministic. Code in games, tests, or code that is cross compiled, often needs code that is absolutely deterministic, so they can be certain it runs the exact same way on any machine.
                </div>
                <div className={cssns("content cozy")}>
                  With Radon, we can enforce that programs, modules, functions, or blocks are deterministic by using the <strong>det</strong> keyword.
                </div>
                <div className={cssns("content splitter cozy")}>
                  <div className={cssns("half")}>
                    The function on the right will halt, because {incode("readline")} is a nondeterministic operation; any nondeterministic operation that happens (directly or indirectly) inside a deterministic function will cause the program to halt.
                  </div>
                  <div className={cssns("half")}>
                    <div className={cssns("code")}>
{`det fn myFunc(stdin: IStream) {
  let input = stdin.readline();
  ...
}`}
                    </div>
                  </div>
                </div>

                <div className={cssns("content splitter")}>
                  <div className={cssns("half")}>
                    However, we're free to receive the input as a parameter; the code on the right is fine.
                  </div>
                  <div className={cssns("half")}>
                    <div className={cssns("code")}>
{`det fn myFunc(input: Str) {
  ...
}`}
                    </div>
                  </div>
                </div>

                <div className={cssns("content splitter")}>
                  <div className={cssns("half")}>
                    We can also use deterministic blocks: all code run while inside the block must be deterministic. Any nondeterministic operation done inside the block will cause the program to halt.
                  </div>
                  <div className={cssns("half")}>
                    <div className={cssns("code")}>
{`fn myFunc(input: Str) {
  det {
    ...
  }
}`}
                    </div>
                  </div>
                </div>

                <h3 className={cssns()}>Levels of Determinism</h3>
                <div className={cssns("content cozy")}>
                  There are three levels of determinism:
                  <ul className={cssns("cozy")}>
                    <li className={cssns()}>Universally Deterministic: Code will run the same between runs and on any machine.</li>
                    <li className={cssns()}>Locally Deterministic: If run on the same machine multiple times, the code will run the same.</li>
                    <li className={cssns()}>Nondeterministic: Even if run on the same machine, the results aren't guaranteed to be the same.</li>
                  </ul>
                </div>
                <div className={cssns("content cozy")}>
                  The only difference between Local and Universal is floating point operations; the same machine will always do floating point operations the same way, but different machines will round results differently.
                </div>
                <div className={cssns("content cozy")}>
                  The <strong>det</strong> keyword means Universally Deterministic; the keyword for Locally Deterministic is <strong>ldet</strong>.
                </div>

                <h3 className={cssns()}>Deterministic Threading</h3>
                <div className={cssns("content cozy")}>
                  Radon is able to schedule threads such that they are run in a deterministic order. To do this, we make a thread pool and specify its scheduler.
                </div>
                <div className={cssns("content cozy")}>
                  One example is the <strong>Round Robin</strong> scheduler. The Round Robin scheduler will run the first one until it has consumed all of its messages <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="noteMessages"/> and is paused, and then run the next one until it has consumed all of its messages and is paused, and so on. It will then repeat the process, until all threads have consumed all their messages and are paused.
                </div>
                <div className={cssns("content cozy")}>
                  Another example is the <strong>Pseudorandom</strong> scheduler. It takes a seed, and then based on that seed, runs the threads in a pseudorandom order. Given the same seed, the scheduler will run the threads in the same order, and get the same result.
                </div>
                <div className={cssns("content cozy")}>
                  Note that when deterministic multithreading, doing any nondeterministic operation inside those threads will halt the program.
                </div>
              </div>

            </div>

            <div className={cssns("margin")}>

              <div className={cssns("notes-header")}>
                <NotesHeader update={this.updateNotesHeaderRect}/>
              </div>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="noteFloat">
                Floating point operations' results might be different on different processors; different processors round numbers differently. If you want deterministic fractions, consider using the fixed point primitives.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="noteCasting">
                The operating system or underlying malloc() implementation chooses where your memory lives, and what address it will have. It is often different between runs.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="noteMessages">
                Remember that Radon threads can only share data by sending and receiving messages.
              </Note>

            </div>
          </div>

        </div>
        <Footer/>
      </div>
    );
  }
}

export default Deterministic;
