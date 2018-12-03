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
        if(this.state.first){
            const a = this.props.location.pathname.substr(1);
            if (a) {
                this.setState({first: false, activeItem: a})
            }
            else{
                this.setState({first: false, activeItem: 'home'})
            }

        }

        if(localStorage.getItem('username')!==null && !this.state.setName){
            this.setState({setName:true,name:localStorage.getItem('username')})
        }
        const Logout = () => {
            localStorage.clear();
            this.setState({change:!this.state.change});
            console.log('here');
        };
        const Login_Logout =() => {
            if(localStorage.getItem('username') !== null) {
                return (
                    <Menu.Item position={'right'}>
                        <Dropdown item text={this.state.name} >
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={Logout}><Icon style={{textAlign:'center'}} name='log out'/></Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>
                )
            }
            else{
                return(
                    <Menu.Item
                        name='login'
                        active={activeItem === 'login'}
                        onClick={this.handleItemClick}
                        path = '/login'
                        position={'right'}
                    ><Icon name='user'/></Menu.Item>

                )
            }
        };
        const { activeItem } = this.state;
        return (

            <Menu inverted style={{height:'100%'}}>
                <Menu.Item
                    name='home'
                    path = '/'
                    active={activeItem === 'home'}
                    onClick={this.handleItemClick}
                >Home</Menu.Item>
                <Menu.Item
                    name='teams'
                    path = '/teams'
                    active={activeItem === 'teams'}
                    onClick={this.handleItemClick}
                >Teams</Menu.Item>
                <Menu.Item
                    name='players'
                    path = '/'
                    active={activeItem === 'players'}
                    onClick={this.handleItemClick}
                >Players</Menu.Item>
                <Menu.Item
                    name='news'
                    path = '/news'
                    active={activeItem === 'news'}
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
            <div>
                <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
                    <Container textAlign='center'>
                        <Grid>
                            <Grid.Row columns={1}>
                                <Grid.Column style={{textAlign: 'center'}}>
                                    <Icon name={'telegram'}/>
                                    <Icon name={'google plus circle'}/>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <div>
                                        ProducedBy : HosseinEffatPanah & AliAsgharKhani
                                        <br/>
                                        <a href={'https://sharif.ir'}>SUT</a>
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Container>
                </Segment>
            </div>
        )
    }
}



export default class Template extends Component {
    constructor(prop){
        super(prop);
    }
    render() {
        const firststyle = {
            // 'border': '1px solid brown',
            'height': '8%'
        };
        const secondstyle = {
            // 'border': '1px solid brown',
            'height': '82%',
            paddingLeft: '2.5vw',
            paddingRight: '2.5vw'
        };
        const thirdstyle = {
            // 'border': '1px solid brown',
            'height': '10%'
        };
        return (
            <div style={{'height': '100vh' }}>
                <Grid  style={{ 'height': '100%', backgroundColor:'#c9c9c9' }}>
                    <Grid.Row columns={1} style={firststyle}>
                        <Grid.Column >
                            <Navbar {...this.props}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row  style={secondstyle}>
                        {this.props.template.body}
                    </Grid.Row>
                    <Grid.Row columns={1} style={thirdstyle}>
                        <Grid.Column >
                            <Footer/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}