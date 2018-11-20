import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import filterFactory from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
const URL = "http://localhost:8080/bob/api/people"

export default class App extends React.Component {
    state = { names: [], sizePerPage: 10, page: 1, totalSize: 420 }

    componentDidMount() {
        const { page, sizePerPage } = this.state
        this.handleTableChange("didMount", { page, sizePerPage });
    }

    handleTableChange = async (type, props) => {
        const { page, sizePerPage } = props
        const URI = `${URL}/page/${page}/amount/${sizePerPage}`;
        let p = await fetch(URI).then(res => {
            // const totalSize = Number(res.headers.get("x-total-count"));
            // console.log("response", res.headers);
            // if (totalSize) { this.setState({ totalSize }) }
            return res.json()
        });
        const names = await p.results;
        this.setState({ names, page, sizePerPage })
    }

    render() {
        const { page, totalSize, sizePerPage } = this.state
        const columns = getColumns();
        const namesData = this.state.names.map(n => nameToNameData(n))

        return (
            <BootstrapTable
                striped
                remote
                bootstrap4
                keyField='id'
                data={namesData}
                columns={columns}
                onTableChange={this.handleTableChange}
                pagination={paginationFactory({ page, sizePerPage, totalSize })}
                filter={filterFactory()}
            />
        )
    }
}

function nameToNameData(n) {
    return {
        name: n.name.first + " " + n.name.last,
        age: n.dob.age,
        email: n.email,
        gender: n.gender,
        nationality: n.nat,
        id: n.name.first + n.name.last+n.dob.age,
    }
}

function getColumns() {
    const columns = [{
        dataField: 'name',
        text: 'Name',
        sort: true
    }, {
        dataField: 'age',
        text: 'Age',
        sort: true
    }, {
        dataField: 'email',
        text: 'Email',
        sort: true
    }, {
        dataField: 'gender',
        text: 'Gender',
        sort: true
    }, {
        dataField: 'nationality',
        text: 'Nationality',
        sort: true
    }];
    return columns;
}