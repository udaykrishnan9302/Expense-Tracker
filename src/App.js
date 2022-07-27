import React from "react";
import { useState} from "react";

function App() {
  /* const [thingsdone, setTask] = useState([{}]); */
  const [actvty, setactvty] = React.useState("");
  const [cost, setcost] = React.useState(0);
  const [Totcost,setTotcost] = React.useState(0);
  const [budgt,setBudgt] = React.useState(0);
  const [TDetails, setDetails] = useState([]);
  const [printStats, setprintStats] = useState(false);
  const [printBudgt, setprintBudgt] = useState(false);
  const [RemBudgt, setRemBudgt] = useState(0);

  const delTask = (index,cost) => {
    const nwTsk = [...TDetails];
    nwTsk.splice(index, 1);
    setDetails(nwTsk);
redcost(cost);
  };

  const addbutton = (e) => {
    e.preventDefault();
    /* const nwTsk = [...TDetails, { TaskVal: actvty }];
    setTask(nwTsk); */

    if (!actvty&&!cost) return;
    var tskStore = [...TDetails, { thingsdone: actvty,costinc:cost }];
    setDetails(tskStore);
    calcTcost();
    console.log("cost: "+cost);
    console.log("total: "+Totcost);
    setactvty("");
    setcost("");
  };

  const calcTcost=()=>{
    var t=Number(Totcost);
    var c =Number(cost);
    t=t+c;
    setTotcost(t);
  }

  const calcRemBudgt=()=>{
    var t=Number(Totcost);
    var b =Number(budgt);
    b=b-t;
    setRemBudgt(b);
  }
 
  const redcost=(cost)=>{
    var t=Number(Totcost);
    var c =Number(cost);
    console.log("total: "+t);
    console.log("cost: "+c);
    t=t-c;
    setTotcost(t);

  }


  /*DATA DISPLAYING AND DELETE BUTTON*/
  function Todo({ todo, index, delTask}) {
    return (
      <div className="p-1">
        {console.log("thingsdone: "+todo.thingsdone)}
        {todo.thingsdone !== "" ? (
          <div className="flex px-2">
            <span className="text-2xl text-transform: capitalize">
              {index + 1}. {todo.thingsdone} {todo.costinc}
             
            </span>

            <div className="ml-auto">
              <button
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded ml-2"
                onClick={() =>
                  delTask(index,todo.costinc)
                }
              >
                X
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
  /*App func return */
  return (
    <div className="flex justify-center p-8">
      <div className=" p-10 text-center bg-rose-300 shadow-xl rounded-lg">
        <h1 className="text-5xl p-4">EXPENSE TRACKER</h1>

        <div class="p-3 text-3xl">
          <b>Add Expenses</b>
        </div>
        <div class="grid grid-cols-3 gap-4 p-3">
        <span className="text-2xl">
              Enter the total budget: 
            </span>
        <input
          type="number"
          className="rounded-lg px-6 border-2 border-neutral-900 p-2"
          value={budgt}
          onChange={(e) => {setBudgt(e.target.value);setprintBudgt(false);setprintStats(false)}}
          placeholder="Add new Tasks"
        />
        
<button
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded ml-2"
          onClick={()=>setprintBudgt(true)}
        >
          Set Budget
        </button>
        </div>
        {printBudgt?
        <h1 className="text-4xl p-2">Total Budget: {budgt}</h1>:null}
        <div class="grid grid-cols-2 gap-4 p-2">
        
        <span className="text-2xl">
              Enter the Activities/ goods spent money spent on: 
            </span>
        <input
          type="text"
          className="rounded-lg px-6 border-2 border-neutral-900 p-2 text-transform: capitalize"
          value={actvty}
          onChange={(e) => {setactvty(e.target.value);setprintStats(false)}}
          placeholder="Add new Tasks"
        />
        <span className="text-2xl">
              Enter the total money spent: 
            </span>
        <input
          type="number"
          className="rounded-lg px-6 border-2 border-neutral-900 p-2"
          value={cost}
          onChange={(e) => {setcost(e.target.value);setprintStats(false)}}
          placeholder="Add new Tasks"
        />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded ml-2"
          onClick={addbutton}
        >
          ADD
        </button>
        {console.log(TDetails)}
        <button
          className="mt-5 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded ml-2 "
          onClick={()=>{setprintStats(true);calcRemBudgt()}}
        >
          Show Stats
        </button>
        {TDetails.length === 0 ? (
          <div className="p-4">
            {TDetails.map((todo, index) => (
              <Todo index={index} todo={todo} delTask={delTask} />
            ))}
          </div>
        ) : (
          <div className="border-2 border-black mr-3 mt-3 rounded-lg">
            {TDetails.map((todo, index) => (
              <Todo key={index} index={index} todo={todo} delTask={delTask} />
            ))}
          </div>
        )}
        {printStats?
        <div>
        <h1 className="text-4xl p-1">Total Cost: {Totcost}</h1>
        <h1 className="text-4xl p-1">Remaining Budget: {RemBudgt}</h1>
        </div>
        :null}



      </div>
    </div>
  );
}

export default App;