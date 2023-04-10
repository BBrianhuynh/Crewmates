import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';
import UpdateGallery from './UpdateGallery';
import App from '../App';
import '../App.css'

const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2ZnJwb21wZG9leGZ6bmJuZHl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA2NTc4ODksImV4cCI6MTk5NjIzMzg4OX0.NaWkPAAbglwNsBkSNz9tn4Mnj5PQvtShjPE2M207jng';
const supabaseUrl = 'https://svfrpompdoexfznbndyu.supabase.co';
var list = [];
var isRender = false;
function Gallery () {
    const [posts, setPosts] = useState([]);
    const supabase = createClient(supabaseUrl, supabaseKey);
    useEffect(() => {
        const fetchPost = async () => {
            const { data } = await supabase
                .from('Posts')
                .select()
                .order('id', { ascending: true })
                setPosts(data);
                isRender = true;
                list = posts;
        }
        fetchPost().catch(console.error);
    })
    function deleteCrewMember(id) {
        const fetchData = async () => {
            await supabase
                .from('Posts')
                .delete()
                .eq('id', id);
                console.log("remove success")
        }
        fetchData().catch(console.error);
    }
    return (
        <div>
            <div>
                <Link to="/" ><button>Create new crewmates</button></Link>
            </div>
            <div>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Speed</th>
                        <th>Color</th>
                        <th>Edit</th>
                        <th>Remove</th>
                    </tr>
                    <tr>
                        <td>{isRender && posts.map((post,index) => {
                            return (
                                <div>
                                    {post.Name}
                                </div>
                            )
                        })}</td>
                        <td>{isRender && posts.map((post) => {
                            return (
                                <div>
                                    {post.Speed}
                                </div>
                            )
                        })}</td>
                        <td>{isRender && posts.map((post) => {
                            return (
                                <div>
                                    {post.Color}
                                </div>
                            )
                        })}</td>
                        <td>{isRender && posts.map((post) => {
                            let tempLink = "/UpdateGallery/" + post.id;
                            return (
                                <div>
                                    <Link to = {tempLink}><button className = "Button">Edit</button></Link>
                                </div>
                            )
                        })}</td>
                        <td>{isRender && posts.map((post,index) => {
                            return (
                                <div>
                                    <button className = "Button" onClick = {() => deleteCrewMember(post.id)}>X</button>
                                </div>
                            )
                        })}</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}
export default Gallery;