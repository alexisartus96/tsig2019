import React, {Component} from 'react';
import PropTypes from 'prop-types';
import now from 'performance-now';
import Easing from 'easing-js';
import raf from 'raf';
import _ from 'lodash';
import arrowUp from '../assets/arrow-up.png';
import { BackIcon, BackLink } from '../styles/backtotop';

const privates = new WeakMap();

export const isNumber = (obj) => {
    return typeof obj === 'number' && !Number.isNaN(obj);
};

export const strip = (number) => {
    return parseFloat(number.toPrecision(12));
};

export const isAnimating = (animations) => {
    for (var [, animation] of animations) {
        if (animation.isAnimating) return true;
    }
    return false;
};

const scheduleAnimation = (context) => {
    raf(() => {
        var animations = privates.get(context);
        var currentTime = now();
        var shouldUpdate = false;
        animations && animations.forEach(function (animation, name) {
            var isFunction = typeof name === 'function';
            if (!animation.isAnimating) return;
            var {duration, easing, endValue, startTime, startValue} = animation;
            var deltaTime = currentTime - startTime;
            if (deltaTime >= duration) {
                Object.assign(animation, {isAnimating: false, startTime: currentTime, value: endValue});
            } else {
                animation.value = strip(Easing[easing](deltaTime, startValue, endValue - startValue, duration));
            }
            shouldUpdate = shouldUpdate || !isFunction;
            if (isFunction) name(animation.value);
        });
        if (animations && isAnimating(animations)) scheduleAnimation(context);
        if (shouldUpdate) context.forceUpdate();
    });
};

class BackToTop extends Component {

    static propTypes = {

        // Make the button visible
        alwaysVisible: PropTypes.bool,

        // Duration of fade effect
        fadeDuration: PropTypes.number,

        // Duration of scroll-to-top effect
        scrollDuration: PropTypes.number,

        // Height of button to become visible
        visibilityHeight: PropTypes.number

    };

    static FADE_DURATION = 300;
    static SCROLL_DURATION = 600;
    static VISIBILITY_HEIGHT = 500;

    constructor(props) {
        super(props);

        this.animate = this.animate.bind(this);
        this.scrollToTop = this.scrollToTop.bind(this);
        this.updateScroll = this.updateScroll.bind(this);
        this.animate = this.animate.bind(this);
        this.scrollToTop = this.scrollToTop.bind(this);
        this.getScrollTop = this.getScrollTop.bind(this);
        this.getScrollBottom = this.getScrollBottom.bind(this);
        this.setScrollTop = this.setScrollTop.bind(this);

        this.state = {
            visible: false,
            bottom: '',
        };
    }

    componentDidMount() {
        this.throttledUpdateScroll = _.throttle(this.updateScroll, 100);
        window.addEventListener('scroll', this.throttledUpdateScroll);
    }

    componentWillUnmount() {
        privates.delete(this);
        window.removeEventListener('scroll', this.throttledUpdateScroll);
    }

    animate(name, endValue, duration, options = {}) {
        var animations = privates.get(this);
        if (!animations) {
            privates.set(this, animations = new Map());
        }
        var animation = animations.get(name);
        var shouldAnimate = options.animation !== false;
        if (!animation || !shouldAnimate || !isNumber(endValue)) {
            let easing = options.easing || 'linear';
            let startValue = isNumber(options.startValue) && shouldAnimate ? options.startValue : endValue;
            animation = {duration, easing, endValue, isAnimating: false, startValue, value: startValue};
            animations.set(name, animation);
        }
        if (!duration) {
            Object.assign(animation, {endValue, value: endValue});
            animations.set(name, animation);
        }
        if (animation.value !== endValue && !animation.isAnimating) {
            if (!isAnimating(animations)) scheduleAnimation(this);
            var startTime = 'startTime' in options ? options.startTime : now();
            duration = duration || animation.duration;
            let easing = options.easing || animation.easing;
            let startValue = animation.value;
            Object.assign(animation, {isAnimating: true, endValue, startValue, startTime, duration, easing});
        }
        return animation.value;
    }

    updateScroll() {
        let {visibilityHeight} = this.props;
        this.setState({visible: this.getScrollTop() > (visibilityHeight || BackToTop.VISIBILITY_HEIGHT)});
        // Adjust bottom css propery of the button, so that it's not above footer
        const scrollBottom = (window.innerHeight + document.documentElement.scrollTop) - (55 + document.body.offsetHeight - document.getElementsByTagName('footer')[0].clientHeight);
        if (scrollBottom > 0) {
          this.setState({
            bottom: `${scrollBottom+55}px`
          })
        } else {
          this.setState({
            bottom: '55px'
          })
        }
    }

    scrollToTop(e) {
        if (e) e.preventDefault();
        let {scrollDuration,onClick} = this.props;
        this.animate(value => this.setScrollTop(value), 0,
            scrollDuration || BackToTop.SCROLL_DURATION, {startValue: this.getScrollTop()});
        if (onClick) {
            onClick(e);
        }
    }

    getScrollTop() {
        return document.documentElement.scrollTop;
    }

    getScrollBottom() {
      return (document.documentElement.scrollTop - document.documentElement.scrollHeight)
    }

    setScrollTop(value) {
        document.body.scrollTop = value;
        document.documentElement.scrollTop = value;
    }

    render() {
        var visible = this.props.alwaysVisible || this.state.visible;
        let {fadeDuration,
            ...options
        } = this.props;
        let opacity = this.animate('opacity', visible ? 1 : 0, fadeDuration || BackToTop.FADE_DURATION);
        if (opacity === 0) return false;
        const { bottom } = this.state;
        return (
            <BackLink {...options}
                      style={{display: 'inline', opacity: opacity}}
                      onClick={this.scrollToTop}
                      bottom={bottom}>
                <BackIcon src={arrowUp} />
            </BackLink>
        );
    }
}

BackToTop.prototype.displayName = 'BackToTop';

export default BackToTop;