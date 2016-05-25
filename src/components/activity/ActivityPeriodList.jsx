import * as React from 'react';
import {Grid, Row, Col, Input, FormControls} from 'react-bootstrap';
import Cons from '../../constants/ActivityConstants';

let colSize = {xs: 5, sm: 5, md:5, lg: 5};
const ActivityPeriod = props => {
    let finishedPeriod = props.period.endDate !== Cons.INVALID_ENDTIME;
    return (
        <Row className='period-row'>
            <Col {...colSize}>
                <Input 
                    type="text" 
                    bsSize='small' 
                    defaultValue={new Date(props.period.start).toLocaleString()}
                    onChange={ e => { 
                        console.log('Teste');  
                        props.period.startDate = Date.parse(e.target.value) ? Date.parse(e.target.value) : props.period.startDate;
                    } 
                    } 
                    />
            </Col>
            <Col {...colSize}>
                <Input 
                    type="text" 
                    bsSize='small' 
                    defaultValue={finishedPeriod ? new Date(props.period.end).toLocaleString() : null} 
                    disabled={!finishedPeriod}/>
            </Col>
        </Row>
    )
}

export default function ActivityPeriodList(props) {
    return (
        <Grid className='period-list' style={{overflowY: 'scroll', maxHeight: '300px', width: '100%'}}>
            <Row><h3 className='text-primary'>Periods  </h3></Row>
            <Row><Col {...colSize}>Start</Col> <Col {...colSize}>End</Col> </Row>
            {props.activity.periods.map(p => <ActivityPeriod key={p.start} period={p} {...props}/>) }
        </Grid>
    )
}