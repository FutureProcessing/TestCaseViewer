import React from 'react';
import ScrollArea from 'scroll-area';

class ExpendableTestCaseList extends React.Component{
    var nodes = this.props.testcases.map(x => {
        return (
            <Toggle
                open={this.props.open}
                header={(
                    <span className={} >
                        <Icon icon="arrow-down" className="folder-icon"/>
                        {this.props.text(node)}
                    </span>
                )}>

            </Toggle>
        );
    });

    render (){
        return (
            <ScrollArea>
                {nodes}
            </ScrollArea>
        );
    }
}

export default ExpendableTestCaseList;
