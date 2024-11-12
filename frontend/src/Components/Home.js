import './Home.css';

function Home({ isLoggedIn, onLogout }) {
    return ( 
        <div className='hall'>
            <div className="hfirst">
                <button className='hb'>About</button>
                <select className='hs'>
                    <option>All</option>
                    <option>Sweets</option>
                    <option>Desgins</option>
                    <option>Hot Scnaks</option>
                    <option>Flowers</option>
                    <option>Cakes</option>
                    <option>Vegtables</option>
                </select>
                <input type="text" placeholder="Search" className='hi'/>
                <h3 className='hh3'>Home Made Goods</h3>
                <button className='hsold'>Sell product</button>
            </div>
            <div>
                Hello
            </div>
        </div>
     );
}

export default Home;