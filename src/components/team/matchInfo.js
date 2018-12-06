import React, { Component } from 'react'
import {Table} from 'semantic-ui-react'
import _ from "lodash";



class MatchInfo extends Component {

    render() {

        const info = this.props.matchData;

        return (
            <Table.Row>
                <Table.Cell>{info['owerTeamGoal']+'-'+info['opponentTeamGoal']}</Table.Cell>
                <Table.Cell>{info['date']}</Table.Cell>
                <Table.Cell>{info['score']}</Table.Cell>
                <Table.Cell>{info['status']}</Table.Cell>
            </Table.Row>
        )
    }
}


export default class MatchesTable extends Component{
    state ={
        matchesData:this.props.matchesData,
        column:null,
        direction:null
    };
    handleSort = clickedColumn => () => {
        const {matchesData, column, direction} = this.state;
        if (column !== clickedColumn) {
            this.setState({
                matchesData:_.sortBy(matchesData, [clickedColumn]),
                column: clickedColumn,
                direction: 'ascending',
            });

            return
        }

        this.setState({
            matchesData: matchesData.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        })
    };

    getTableData (){
        return(
            this.state.matchesData.map((data) => {
                    return(
                        <MatchInfo matchData={data}/>
                    )
                }
            )
        )
    };
    render() {
        const {matchesData, column, direction} = this.state;
        return (
            <Table sortable celled fixed style={{backgroundColor:'#008b3f'}}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell
                        >
                            نتیجه
                        </Table.HeaderCell>
                        <Table.HeaderCell
                            sorted={column === 'date' ? direction : null}
                            onClick={this.handleSort('date')}
                        >
                            تاریخ
                        </Table.HeaderCell>
                        <Table.HeaderCell
                            sorted={column === 'score' ? direction : null}
                            onClick={this.handleSort('score')}
                        >
                            امتیاز
                        </Table.HeaderCell>
                        <Table.HeaderCell
                            sorted={column === 'win/lose/draw' ? direction : null}
                            onClick={this.handleSort('win/lose/draw')}
                        >
                            وضعیت</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.getTableData()}
                </Table.Body>
            </Table>
        );
    }
}