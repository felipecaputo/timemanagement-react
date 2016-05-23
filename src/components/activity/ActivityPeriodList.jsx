import * as React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import Cons from '../../constants/ActivityConstants';

const ActivityPeriod = props => {
    let finishedPeriod = props.period.endDate === Cons.INVALID_ENDTIME;
    
    return (
        <Row className='period-row'>
            <Col xs={6} md={6} lg={4}>
                <input type="date" defaultValue={props.period.start}/>
            </Col>
            <Col xs={6} md={6} lg={4}>
                <input type="date" defaultValue={finishedPeriod ? props.period.end : null} disabled={!finishedPeriod}/>
            </Col>
        </Row>
    )
}

export default function ActivityPeriodList(props) {
    return (
        <Grid className='period-list'>
            {props.activity.periods.map(p => <ActivityPeriod key={p.start} period={p} {...props}/>) })}
        </Grid>
    )
}