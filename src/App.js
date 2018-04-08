import React, { Component } from 'react';
import data from "./data.json";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from 'react-router-dom'



const Home = (props) => (
    <div>
        <h2>Welcome {props.msg}</h2>
        <button>
            <Link to="/all">See all users</Link>
        </button>
    </div>
)

const All = ({ match }) => {
    const allData = data.users;
    var userTable = allData.map((user) => {
        return (
            <tr key={user.dob}>
                <td><img src={user.picture.thumbnail} alt="thumbnail" /></td>
                <td>{user.first} {user.last}</td>
                <td><Link to={`${match.url}/${user.dob}`}>More</Link></td>

            </tr>
        )
    })
    return (
        <div>
            <h3>All Users</h3>
            <table>
                <tbody>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Details</th>
                </tr>
                {userTable}
                </tbody>
            </table>
            <button>
                <Link to="/">Back</Link>
            </button>
            <button>
                <Link to="/all">Clear</Link>
            </button>
            <Route path={`${match.url}/:userDob`}
                   render={(props) => <Details data={allData} {...props} />}
            />

        </div>
    );


};

const Detail = ({ match }) => (
    <div>
        <h3>{match.params.detailId}</h3>
    </div>
)


const Details = ({match, data}) => {
    var userDetails = data.find(userDetail => userDetail.dob === match.params.userDob);
    var userData;

    if(userDetails)
        userData = <div>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Street</th>
                    <th>City</th>
                    <th>Zipcode</th>
                    <th>Email</th>
                    <th>Cellphone</th>
                </tr>
                <tr>
                    <td><img src={userDetails.picture.large} alt="" /></td>
                    <td>{userDetails.first} {userDetails.last}</td>
                    <td>{userDetails.street}</td>
                    <td>{userDetails.city}</td>
                    <td>{userDetails.zip}</td>
                    <td>{userDetails.email}</td>
                    <td>{userDetails.cell}</td>
                </tr>
                </tbody>
            </table>
        </div>
    else userData = <div>
        <p>No user found</p>
    </div>

    return (
        <div>
            {userData}
        </div>
    )
}

const BasicExample = () => (
    <Router>
        <Switch>
            <Route exact path="/" render={() => <div><Home msg="Parry Hotter.."/></div>}/>
            <Route path="/all" component={All}/>
        </Switch>
    </Router>
)
export default BasicExample