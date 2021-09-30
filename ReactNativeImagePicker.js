/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Image, Button, Platform } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

export default class ImagePickerWrapper extends React.Component {
    state = {
        photo: null,
        endpoint: undefined,
    }

    handleChoosePhoto = () => {
        const options = {
            noData: true,
        };
        ImagePicker.launchImageLibrary(options, response => {
            if (response.assets) {
                this.setState({ photo: response.assets[0] });
                console.log(this.state);
            } else {
                console.log(response);
            }
        });
    }

    handlePhotoUpload = () => {

        const data = new FormData();

        data.append('profile', {
            name: this.state.photo.fileName,
            type: this.state.photo.type,
            uri:
                Platform.OS === 'android' ? this.state.photo.uri : this.state.photo.uri.replace('file://', '')
        });


        fetch(this.state.endpoint, {
            method: 'POST',
            body: data,
        })
            .then(response => response.json())
            .then(response => {
                console.log('upload succes', response);
                console.log('Upload success!');
                this.setState({ photo: null });
            })
            .catch(error => {
                console.log('upload error', error);
                console.log('Upload failed!');
            });
    }

    render() {
        const { photo } = this.state;
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {photo && (
                    <Image
                        source={{ uri: photo.uri }}
                        style={{ width: 300, height: 300 }}
                    />
                )}
                <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
                <Button title="Upload Photo" onPress={this.handlePhotoUpload} />
            </View>
        );
    }
}