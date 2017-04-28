(function (React,toCSS,PropTypes,Time,reactRouterDom,reactDom) {
'use strict';

React = 'default' in React ? React['default'] : React;
toCSS = 'default' in toCSS ? toCSS['default'] : toCSS;
PropTypes = 'default' in PropTypes ? PropTypes['default'] : PropTypes;
Time = 'default' in Time ? Time['default'] : Time;

// https://github.com/darkskyapp/string-hash/blob/master/index.js
var hash = function (str) {
  var vhash = 5381;
  var i = str.length;

  while (i) {
    vhash = (vhash * 33) ^ str.charCodeAt(--i);
  }
  return vhash >>> 0;
};

var getStyle = function (props) {
  if (!(props.style || props.styleActive || props.styleHover || props.styleActiveHover )) { return null }

  var style = toCSS(props.style);
  var className = "s-" + (Date.now()) + (hash(style));

  var theStyle = [
    ("." + className + "{" + style + "}"),
    props.styleActive && ("." + className + ".active{" + (toCSS(props.styleActive)) + "}"),
    props.styleHover && ("." + className + ":hover{" + (toCSS(props.styleHover)) + "}"),
    props.styleActiveHover && ("." + className + ".active:hover{" + (toCSS(props.styleActiveHover)) + "}") ].filter(Boolean).join('');

  return {
    className: className,
    style: React.createElement( 'style', null, theStyle ),
  }
};

var Action = (function (superclass) {
  function Action(props) {
    superclass.call(this, props);
    this.state = getStyle(props);
  }

  if ( superclass ) Action.__proto__ = superclass;
  Action.prototype = Object.create( superclass && superclass.prototype );
  Action.prototype.constructor = Action;

  Action.prototype.componentWillReceiveProps = function componentWillReceiveProps (nextProps) {
    this.setState(getStyle(nextProps));
  };

  Action.prototype.render = function render$$1 () {
    var ref = this;
    var props = ref.props;
    var state = ref.state;

    return (
      React.createElement( 'button', {
        className: props.isActive ? ((state.className) + " active") : state.className, onClick: props.onClick },
        state.style,
        props.children
      )
    )
  };

  return Action;
}(React.Component));

Action.propTypes = {
  isActive: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object,
  styleActive: PropTypes.object,
  styleActiveHover: PropTypes.object,
  styleHover: PropTypes.object,
};

var button = function (props) { return (
  React.createElement( Action, {
    isActive: props.isActive, styleHover: {
      backgroundColor: 'turquoise',
    }, styleActive: {
      backgroundColor: 'deepskyblue',
    }, styleActiveHover: {
      backgroundColor: 'purple',
    }, onClick: props.onClick, style: {
      flexDirection: 'column',
      borderRadius: 8,
      margin: props.margin,
      padding: 20,
      transition: 'all 0.2s linear',
    } },
    React.createElement( 'div', {
      style: {
        color: 'white',
        fontFamily: 'Roboto, sans-serif',
        fontSize: 14,
      } },
      props.text
    ),
    props.children
  )
); };

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
      React.createElement( button, {
        isActive: state.isActive, margin: props.margin, onClick: this.onClick, text: props.text })
    )
  };

  return AnotherButton;
}(React.Component));

var button$1 = function (props) { return (
  React.createElement( Action, {
    isActive: props.isActive, styleHover: {
      backgroundColor: 'turquoise',
    }, styleActive: {
      backgroundColor: 'deepskyblue',
    }, styleActiveHover: {
      backgroundColor: 'purple',
    }, onClick: props.onClick, style: {
      flexDirection: 'column',
      borderRadius: 8,
      margin: props.margin,
      padding: 20,
      transition: 'all 0.2s linear',
    } },
    React.createElement( 'div', {
      style: {
        color: 'white',
        fontFamily: 'Roboto, sans-serif',
        fontSize: 14,
      } },
      props.text
    ),
    props.children
  )
); };

var app = function (props) { return (
  React.createElement( 'div', {
    style: {
      flexDirection: 'column',
      backgroundColor: 'deeppink',
      borderRadius: 4,
      margin: 30,
      width: props.width,
    } },
    React.createElement( 'div', {
      style: {
        color: 'white',
        padding: 20,
        fontFamily: 'Roboto, sans-serif',
        fontSize: 40,
      } },
      "I'm an app..."
    ),
    React.createElement( 'div', {
      style: {
        backgroundColor: '#ffffff',
        padding: 20,
      } },
      props.listOfStuff &&
        props.listOfStuff.map(function (item, i) { return (
          React.createElement( 'div', {
            style: {
              color: item.color,
              marginTop: 5,
            } },
            ((i + 1) + ". " + (item.label))
          )
        ); })
    ),
    React.createElement( button$1, {
      isActive: props.isActive, margin: 20, onClick: props.onClick, text: props.text }),
    React.createElement( AnotherButton, { margin: 20, text: "Another Button" }),
    React.createElement( 'div', {
      style: {
        flexDirection: 'column',
        margin: 20,
      } },
      React.createElement( Time, {
        value: props.time, format: "DD.MM.YYYY", style: {
          color: 'white',
          fontFamily: 'Roboto, sans-serif',
          fontSize: 20,
        } })
    ),
    props.children
  )
); };

var listOfStuff = [{
  label: 'hey',
  color: 'salmon'
}, {
  label: 'ho',
  color: 'red'
}];

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
      React.createElement( app, {
        isActive: state.isActive, listOfStuff: listOfStuff, onClick: this.onClick, time: new Date(), text: 'Click me 👻', width: 360 })
    )
  };

  return Home;
}(React.Component));

reactDom.render(
  React.createElement( reactRouterDom.BrowserRouter, null,
    React.createElement( reactRouterDom.Route, { path: '/', component: Home })
  ),
  document.getElementById('root')
);

}(React,toCSS,PropTypes,Time,reactRouterDom,reactDom));
