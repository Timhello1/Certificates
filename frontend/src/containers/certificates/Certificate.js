    import React, {Component} from 'react'
    import PropTypes from 'prop-types';
    import {bindActionCreators} from 'redux'
    import {connect} from 'react-redux'
    import {Button, Col, ControlLabel, Form, FormControl, FormGroup, Glyphicon, Row} from "react-bootstrap";
    import * as actions from "./CertificatesApi";
    import {loadAllUsers} from "../users/UsersApi";
    import User from '../users/User';
import { Redirect } from 'react-router-dom';

    class Certificate extends Component {

        handleNameChange = (e) => {
            const {resource} = this.state;
            this.setState({resource: {...resource, name: e.target.value}});
        };
        handleDescriptionChange = (e) => {
            const {resource} = this.state;
            this.setState({resource: {...resource, description: e.target.value}});
        };
        handleUserChange = (e) => {
            const userId = e.target.value; 
            this.setState({ resource: { ...this.state.resource, user_id: userId } }); 
        };
        
        
        saveCertificate = (e) => {
            e.preventDefault();
            const {resource} = this.state;
            const validationErrors = {};
            if (Object.keys(resource).length > 0) {
                if (!resource.name || resource.name.length < 3)
                    validationErrors.name = "invalid name";
                if (!resource.description || resource.description.length < 5)
                    validationErrors.description = "invalid description";
            }
            this.context.router.history.push('/certificates');
            if (Object.keys(validationErrors).length > 0) {
                this.setState({validationErrors});
            } else {
                this.props.actions.saveCertificate(resource, () => {
                    this.context.router.history.push('/certificates');
                });
            
            }
        };

        constructor(props, context) {
            super(props, context);

            this.state = {
                resource: {},
                validationErrors: {},
                users: [],
            }
        };

        componentDidMount() {
            console.log("component logged")
            try {
                this.props.loadAllUsers(users => {
                    console.log("Loaded users:", users);
                    this.setState({ users });
                });
        
                const id = this.props.match.params.id;
                console.log(id)
                if (id) {
                    this.loadCertificate(id);
                }
            } catch (error) {
                console.error("Error loading data:", error);
            }
        }
        


        loadCertificate(id) {
            this.props.actions.loadCertificate(id, resource => {
                console.log(resource)
                // Check if the resource is valid
                if (resource) {
                    // Set the fetched resource to the component state
                    this.setState({ resource, previousName: resource.name });
                } else {
                    // Handle the case where the resource is not found
                    console.error("Certificate not found");
                    // You might want to redirect the user or display an error message
                }
            }).catch(error => {
                // Handle API call errors
                console.error("Error loading certificate:", error);
                // You might want to redirect the user or display an error message
            });
        }
        

        getValidationState(id) {
            const {validationErrors} = this.state;
            if (validationErrors.name && id === 'name') {
                return 'error';
            }
            if (validationErrors.description && id === 'description') {
                return 'error';
            }
            return null;
        }

        render() {
            const {resource, validationErrors, previousName, users} = this.state;
            return (
                <div>
                    {resource && <Row className="vertical-middle breadcrumbs">
                        <Col xs={8}>
                            <h5>
                                <Glyphicon
                                    glyph="cog"/> Admin > Certificates > {resource.id ?
                                    <span><b>{previousName}</b> - edit</span> :
                                    <span>New</span>}
                            </h5>
                        </Col>
                    </Row>
                    }
                    {resource &&
                    <Row id='form'>
                        <Col xs={12} md={6}>
                            <Form horizontal onSubmit={this.saveCertificate}>
                                <FormGroup
                                    controlId="name"
                                    validationState={this.getValidationState('name')}
                                >
                                    <Col componentClass={ControlLabel} sm={2}>Name</Col>
                                    <Col sm={10}>
                                        <FormControl
                                            type="text"
                                            value={resource.name}
                                            placeholder="Enter name"
                                            onChange={this.handleNameChange}
                                        />
                                        {
                                            Object.keys(validationErrors).length > 0 && validationErrors.name &&
                                            <ControlLabel>{validationErrors.name}</ControlLabel>
                                        }
                                    </Col>
                                    <FormControl.Feedback/>
                                </FormGroup>
                                <FormGroup
                                    controlId="description"
                                    validationState={this.getValidationState('description')}
                                >
                                    <Col componentClass={ControlLabel} sm={2}>Description</Col>
                                    <Col sm={10}>
                                        <FormControl
                                            type="textarea"
                                            value={resource.description}
                                            placeholder="Enter description"
                                            onChange={this.handleDescriptionChange}
                                        />
                                        {
                                            Object.keys(validationErrors).length > 0 && validationErrors.description &&
                                            <ControlLabel>{validationErrors.description}</ControlLabel>
                                        }
                                    </Col>
                                    <FormControl.Feedback/>
                                </FormGroup>
                                <FormGroup controlId="user">
                                    <Col componentClass={ControlLabel} sm={2}>User</Col>
                                    <Col sm={10}>
                                    <FormControl
                                        componentClass="select"
                                        value={resource.user_id || ''}
                                        onChange={this.handleUserChange}
                                    >
                                            <option value="">Select user</option>
                                            {users.map(user => (
                                                <option key={user.id} value={user.id}>
                                                    {user.email}
                                                </option>
                                            ))}
                                        </FormControl>
                                        <FormControl.Feedback />
                                    </Col>
                                </FormGroup>

                                <Col xsOffset={2} xs={10} className='form-buttons margin10'>
                                    <Button type="submit" bsStyle={'success'} onClick={this.saveCertificate}>Save</Button>
                                    <Button
                                        bsStyle={'warning'}
                                        onClick={() => this.context.router.history.push(`/certificates`)}
                                    >
                                        Cancel
                                    </Button>
                                </Col>
                            </Form>
                        </Col>
                    </Row>
                    }

                </div>
            );
        }
    }

    Certificate.contextTypes = {
        router: PropTypes.object
    };


    const mapDispatchToProps = dispatch => ({
        actions: bindActionCreators(
            actions,
            dispatch),
            loadAllUsers: bindActionCreators(loadAllUsers, dispatch)
    });

    export default connect(
        undefined,
        mapDispatchToProps
    )(Certificate)
