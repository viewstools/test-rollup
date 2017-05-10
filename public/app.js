(function (React,viewsBlocksReactDom,Time,reactRouterDom,reactDom) {
'use strict';

React = 'default' in React ? React['default'] : React;
Time = 'default' in Time ? Time['default'] : Time;

var Button = function (props) { return (
  React.createElement( viewsBlocksReactDom.ViewsAction, {
isActive: props.isActive, styleHover: {
backgroundColor: "turquoise"
}, styleActive: {
backgroundColor: "deepskyblue"
}, styleActiveHover: {
backgroundColor: "purple"
}, onClick: props.onClick, style: {
flexDirection: "row",
alignItems: "center",
borderRadius: 8,
margin: props.margin,
padding: 20,
transition: "all 0.2s linear"
} },
React.createElement( props.icon, {
blockIs: "Icon", fontSize: 80 }),
React.createElement( 'div', {
style: {
color: "white",
fontFamily: "Roboto, sans-serif",
fontSize: 14,
marginLeft: 10
} },
props.text
),
props.children)

); };

var AnotherIcon = function () { return React.createElement( 'div', { style: { fontSize: 50 } }, "😇"); };

var AnotherButton = (function (superclass) {
  function AnotherButton(props) {
    superclass.call(this, props);

    this.state = {
      isActive: false,
    };

    this.onClick = this.onClick.bind(this);
  }

  if ( superclass ) AnotherButton.__proto__ = superclass;
  AnotherButton.prototype = Object.create( superclass && superclass.prototype );
  AnotherButton.prototype.constructor = AnotherButton;

  AnotherButton.prototype.onClick = function onClick () {
    this.setState(function (prevState) { return ({
      isActive: !prevState.isActive,
    }); });
  };

  AnotherButton.prototype.render = function render$$1 () {
    var ref = this;
    var props = ref.props;
    var state = ref.state;

    return (
      React.createElement( Button, {
        icon: AnotherIcon, isActive: state.isActive, margin: props.margin, onClick: this.onClick, text: props.text })
    )
  };

  return AnotherButton;
}(React.Component));

var Icon = function (props) { return (
  React.createElement( 'div', {
style: {
fontSize: props.fontSize || 50
} },
"🤖"
)

); };

var App = function (props) { return (
  React.createElement( 'div', {
style: {
flexDirection: "column",
backgroundColor: "deeppink",
borderRadius: 4,
margin: 30,
width: props.width
} },
React.createElement( 'div', {
style: {
padding: 20,
fontFamily: "Roboto, sans-serif",
fontSize: 40
} },
"I'm an app..."
),
React.createElement( 'div', {
style: {
backgroundColor: "#ffffff",
padding: 20
} },
props.listOfStuff && props.listOfStuff.map(function (item, i) { return (
React.createElement( 'div', {
key: i, style: {
color: item.color,
marginTop: 5
} },
((i + 1) + ". " + (item.label))
)

); })
),
React.createElement( Button, {
icon: Icon, isActive: props.isActive, margin: 20, onClick: props.onClick, text: props.text }),
React.createElement( AnotherButton, {
margin: 20, text: "Another Button" }),
React.createElement( 'div', {
style: {
flexDirection: "column",
margin: 20
} },
React.createElement( Time, {
value: props.time, format: "DD.MM.YYYY", style: {
color: "white",
fontFamily: "Roboto, sans-serif",
fontSize: 20
} })
),
props.children)

); };

var listOfStuff = [
  {
    label: 'hey',
    color: 'salmon',
  },
  {
    label: 'ho',
    color: 'red',
  } ];

var Home = (function (superclass) {
  function Home(props) {
    superclass.call(this, props);

    this.state = {
      isActive: false,
    };

    this.onClick = this.onClick.bind(this);
  }

  if ( superclass ) Home.__proto__ = superclass;
  Home.prototype = Object.create( superclass && superclass.prototype );
  Home.prototype.constructor = Home;

  Home.prototype.onClick = function onClick () {
    this.setState(function (prevState) { return ({
      isActive: !prevState.isActive,
    }); });
  };

  Home.prototype.render = function render$$1 () {
    var ref = this;
    var props = ref.props;
    var state = ref.state;

    return (
      React.createElement( App, {
        isActive: state.isActive, listOfStuff: listOfStuff, onClick: this.onClick, time: new Date(), text: "Click me 👻", width: 360 })
    )
  };

  return Home;
}(React.Component));

reactDom.render(
  React.createElement( reactRouterDom.BrowserRouter, null,
    React.createElement( reactRouterDom.Route, { path: "/", component: Home })
  ),
  document.getElementById('root')
);

}(React,viewsBlocksReactDom,Time,reactRouterDom,reactDom));
