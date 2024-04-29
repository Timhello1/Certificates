import React, {Component} from 'react'
import {Glyphicon, Grid, MenuItem, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {connect} from 'react-redux';
import * as actions from './AppTemplateActions'
import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css"
import 'material-design-icons-iconfont/dist/material-design-icons.scss';
import MDSpinner from "react-md-spinner";

import TermsModal from '../modals/TermsModal';

class AppTemplate extends Component {

    render() {
        const {authenticated, loading, showTermsModal, hideTermsModal} = this.props;
        return (
            <div>
                {authenticated && <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <LinkContainer exact to="/certificates">
                                <a className="navbar-brand">
                                    <img src="/logo.svg" className="logo" alt="logo" />
                                    <small>Certificates</small>
                                </a>
                            </LinkContainer>
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavDropdown id="admin" eventKey={1}
                                         title={
                                             <span>
                                                     <Glyphicon glyph="cog"/> Admin
                                                 </span>}
                            >
                                <LinkContainer exact to="/">
                                    <MenuItem eventKey={1.1}>
                                        Users
                                    </MenuItem>
                                </LinkContainer>
                            </NavDropdown>
                        </Nav>
                        <Nav pullRight className="vmiddle">
                            {loading && <span className="pull-left">
                                <MDSpinner size={20}/>
                            </span>}
                            <NavDropdown id="terms" eventKey={2} title="Terms">
    <MenuItem eventKey={2.1} onClick={this.props.showTermsModal}>View Terms</MenuItem>
</NavDropdown>

                            <NavDropdown id="user" eventKey={3} title="Profile">
                                <LinkContainer exact to="/login">
                                    <MenuItem
                                        onClick={this.props.actions.logout} eventKey={3.2}><Glyphicon
                                        glyph="log-out"/> Logout</MenuItem>
                                </LinkContainer>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                    <TermsModal
                    show={this.props.termsModalVisible}
                    onHide={hideTermsModal}
                    termsContent="Be a good person :)"
                    />
                </Navbar>
                }
                <Grid>
                    {this.props.children}
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = ({appState}) => ({
    locale: appState.locale,
    alerts: appState.alerts,
    loading: appState.loading,
    profile: appState.profile,
    authenticated: appState.authenticated,
    termsModalVisible: appState.termsModalVisible,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
    showTermsModal: () => dispatch({ type: 'SHOW_TERMS_MODAL' }),
    hideTermsModal: () => dispatch({ type: 'HIDE_TERMS_MODAL' }),
});


export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(AppTemplate))
