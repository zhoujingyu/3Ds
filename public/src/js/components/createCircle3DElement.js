let CreateCircle3DEl = React.createClass({
    render: function () {
        return (
            <div className="circle3D" style={this.props.circle3DStyle}>
                <div className="circle3Ds"  style={this.props.circle3DsStyle}>
                    <div style={this.props.divStyle}></div>
                    {
                        React.Children.map(this.props.divStyle,function(item,index){
                            let arr=item.split(';');
                            let obj={
                                "backgroundImage":arr[0],
                                "width": arr[1],
                                "height": arr[2],
                                "transform": arr[3]
                            };
                            return <div style={obj}></div>
                        })
                    }
                </div>
            </div>
        )
    }
});

module.exports = CreateCircle3DEl;