import React from 'react';
import Scrollbar from './scrollBar.jsx';

class ScrollArea extends React.Component{
    constructor(props){
        this.state = {
            topPosition: 0,
            realHeight: 0,
            containerHeight: 0,
            scrollable: false
        };

        this.setHeights = this.setHeightsToState.bind(this);
    }

    componentDidMount(){
        window.addEventListener("resize", this.setHeights);
        this.setHeightsToState();
    }

    componentWillUnmount(){
        window.removeEventListener("resize", this.setHeights);
    }

    componentWillReceiveProps(newProps){
        this.setHeightsToState();
    }

    render(){
        var style = {
            marginTop: this.state.topPosition
        };

        var scrollbar = this.state.scrollable? (
            <Scrollbar
                realHeight={this.state.realHeight}
                containerHeight={this.state.containerHeight}
                scrollTop={-this.state.topPosition}
                onMove={this.handleMove.bind(this)}/>
        ): null;

        var classes = 'scrollarea ' + this.props.className;
        return (
            <div className={classes} onWheel={this.handleWheel.bind(this)}>
                <div ref="content" style={style} className="scrollarea-content">
                    {this.props.children}
                </div>
                {scrollbar}
            </div>
        );
    }

    handleMove(deltaY){
        var heights = this.computeHeights();
        this.setState(heights);
        if(heights.scrollable){
            var newTopPosition = this.computeTopPosition(deltaY);
            this.setState({topPosition: newTopPosition});
        }
    }

    handleWheel(x){
        var heights = this.computeHeights();
        this.setState(heights);
        if(heights.scrollable){
            var newTopPosition = this.computeTopPosition(-x.deltaY);
            this.setState({topPosition: newTopPosition});
        }
    }

    computeTopPosition(deltaY){
        var newTopPosition = this.state.topPosition + deltaY;
        if(-newTopPosition > this.state.realHeight - this.state.containerHeight){
            newTopPosition = -(this.state.realHeight - this.state.containerHeight);
        } else if(newTopPosition > 0){
            newTopPosition = 0;
        }

        return newTopPosition;
    }

    computeHeights(){
        var content = React.findDOMNode(this.refs.content);
        var container = React.findDOMNode(this);
        return {
            realHeight: content.offsetHeight,
            containerHeight: container.offsetHeight,
            scrollable: content.offsetHeight > container.offsetHeight
        };
    }

    setHeightsToState(){
        var heights = this.computeHeights();
        this.setState(heights);
    }
}

ScrollArea.propTypes = {
    className: React.PropTypes.string,
    speed: React.PropTypes.number
};

export default ScrollArea;
