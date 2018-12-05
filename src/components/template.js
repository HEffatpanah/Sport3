import React,{Component} from "react";

import { Menu,Grid, Dropdown, Icon} from 'semantic-ui-react'

import {
    Container,
    Segment,
} from 'semantic-ui-react'


class Navbar extends Component {
    state = {
        activeItem: this.props.location.pathname,
        setName:false,
        name:'Login',
        change:false,
        first: true
    };
    handleItemClick = (e, {name,path}) => {
        this.setState({activeItem: name});
        if(this.props.location.pathname!==path)
            this.props.history.push(path);
    };
    handleDropdownitemClick = (e, {value}) => {
        if (value === 'football'){
            this.props.history.push("/footballMatches");
        }
        else if (value === 'basketball'){
            this.props.history.push("/basketballMatches");
        }
    };
    render() {
        if(localStorage.getItem('username')!==null && !this.state.setName){
            this.setState({setName:true,name:localStorage.getItem('username')})
        }
        const Logout = () => {
            localStorage.clear();
            this.setState({change:!this.state.change});
        };
        const Login_Logout =() => {
            if(localStorage.getItem('username') !== null) {
                return (

                        <Dropdown text={this.state.name} item pointing={'right top'}>
                            <Dropdown.Menu >
                                <Dropdown.Item onClick={Logout}>Logout<Icon style={{textAlign:'center'}} name='log out'/></Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                )
            }
            else{
                return(
                    <Menu.Item
                        name='login'
                        active={this.props.location.pathname === '/login'}
                        onClick={this.handleItemClick}
                        path = '/login'
                        position={'right'}
                    ><Icon name='user'/></Menu.Item>

                )
            }
        };
        return (

            <Menu inverted style={{height:'100%'}}>
                <Menu.Item
                    name='home'
                    path = '/'
                    active={this.props.location.pathname === '/'}
                    onClick={this.handleItemClick}
                >Home</Menu.Item>
                <Menu.Item
                    name='teams'
                    path = '/teams'
                    active={this.props.location.pathname === '/teams'}
                    onClick={this.handleItemClick}
                >Teams</Menu.Item>
                <Menu.Item
                    name='players'
                    path = '/'
                    active={this.props.location.pathname === '/players'}
                    onClick={this.handleItemClick}
                >Players</Menu.Item>
                <Menu.Item
                    name='news'
                    path = '/news'
                    active={this.props.location.pathname === '/news'}
                    onClick={this.handleItemClick}
                >News</Menu.Item>
                <Dropdown text='Sports' simple item>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={this.handleDropdownitemClick}  value='football'>Football</Dropdown.Item>
                        <Dropdown.Item onClick={this.handleDropdownitemClick}  value='basketball'>Basketball</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                {Login_Logout()}
            </Menu>



        )
    }
}


class Footer extends Component{
    render(){
        return(

                <Segment inverted vertical style={{ padding: '5em 0em'}}>

                        <Grid >
                            <Grid.Row columns={1}>
                                <Grid.Column style={{textAlign: 'center'}}>
                                    <Icon name={'telegram'}/>
                                    <Icon name={'google plus circle'}/>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column style={{textAlign: 'center'}}>
                                    <div>
                                        ProducedBy : HosseinEffatPanah & AliAsgharKhani
                                        <br/>
                                        <a href={'https://sharif.ir'}>SUT</a>
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>

                </Segment>

        )
    }
}



export default class Template extends Component {

    render() {
        const firststyle = {
            backgroundColor:'#e8e8e8',
            height:'7vh'
        };
        const secondstyle = {
            paddingLeft: '2.5vw',
            paddingRight: '2.5vw',
            backgroundColor:'#e8e8e8',
            height:'100%'
        };
        const thirdstyle = {
            backgroundColor:'#e8e8e8',
            height:'15vh',
        };
        return (
            <div style={{'height': '100vh' }}>
                <Grid  style={{ 'height': '100%'}}>
                    <Grid.Row style={firststyle}>
                        <Grid.Column >
                            <Navbar {...this.props}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row  style={secondstyle}>
                        {this.props.body}
                    </Grid.Row>
                    <Grid.Row style={thirdstyle}>
                        <Grid.Column >
                            <Footer/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}