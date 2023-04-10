import { createClient } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Gallery from './Gallery';

var originalName = "";
var originalSpeed = 0;
var originlColor = "White";
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2ZnJwb21wZG9leGZ6bmJuZHl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA2NTc4ODksImV4cCI6MTk5NjIzMzg4OX0.NaWkPAAbglwNsBkSNz9tn4Mnj5PQvtShjPE2M207jng';
const supabaseUrl = 'https://svfrpompdoexfznbndyu.supabase.co';
var isRender = false;
var temp =[];

const UpdateGallery = () => {
    var params = useParams();
    var [posts, setPosts] = useState([]);
    const supabase = createClient(supabaseUrl, supabaseKey);
    useEffect(() => {
        const fetchPost = async () => {
            const { data } = await supabase
                .from('Posts')
                .select()
                .order('id', { ascending: true })
                setPosts(data);
            var newTemp = posts.filter((post) =>
                post.id == params.id
            )
            temp = newTemp;
        }
        fetchPost().catch(console.error);
        if (temp.length != 0)
        {
            isRender = true;
        }
    })
    const updateInfo = async (event) => {
        let name = document.getElementById("nameHolder").value;
        let speed = document.getElementById("speedHolder").value;
        let color = document.getElementById("colorHolder").value;
        await supabase
            .from('Posts')
            .update({ Name: name, Speed: speed, Color: color})
            .eq('id', temp[0].id)
    }
    return (
        <div>
            <div>
            {isRender && <input type="text" id = "nameHolder" placeholder="Edit Name"></input>}
            </div>
            <div>
            {isRender && <input type="text" id = "speedHolder" placeholder="Edit Speed"></input>}
            </div>
            <div>
            {isRender && <input type="text" id = "colorHolder" placeholder="Edit Color"></input>}
            </div>
            <div>
            <Link to="/Gallery" ><button onClick={(updateInfo)}>Update Info</button></Link>
                <Link to="/Gallery" ><button className = "Button">Cancel</button></Link>
            </div>
        </div>
    )
}
export default UpdateGallery;
