import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import './App.css'
import { Link } from "react-router-dom";

const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2ZnJwb21wZG9leGZ6bmJuZHl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA2NTc4ODksImV4cCI6MTk5NjIzMzg4OX0.NaWkPAAbglwNsBkSNz9tn4Mnj5PQvtShjPE2M207jng';
const supabaseUrl = 'https://svfrpompdoexfznbndyu.supabase.co';

function App() {
  const [posts, setPosts] = useState([]);
  const supabase = createClient(supabaseUrl, supabaseKey);
  const createPost = async (event) => {
    event.preventDefault();
    let name = document.getElementById("nameHolder").value;
    let speed = document.getElementById("speedHolder").value;
    let color = document.getElementById("colorHolder").value;
    await supabase
    .from('Posts')
    .insert([{Name: name, Speed: speed, Color: color}])
    .select();
    window.location.reload(true);
  }
  useEffect(() => {
    const fetchPost = async () => {
        const { data } = await supabase
            .from('Posts')
            .select()
            .order('id', { ascending: true })
            setPosts(data);
    }
    fetchPost().catch(console.error);
})
  return (
    <div className="App">
      <div>
      <div>
      <Link to="/Gallery" data = {posts}><button>Crewmate Gallery</button></Link>
      </div>
      <div>
      <input type="text" id = "nameHolder" placeholder="Name"></input>
      </div>
      <div>
      <input type="text" id = "speedHolder" placeholder="Speed"></input>
      </div>
      <div>
      <input type="text" id = "colorHolder" placeholder="Color"></input>
      </div>


      <div>
        <button onClick={createPost}>Submit</button>
      </div>
      </div>
    </div>
  )
}

export default App;