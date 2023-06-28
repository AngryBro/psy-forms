export const Api = (routeName) => {
    
    const routes = {
        getPassword: "/password.get",
        verifyPassword: "/password.verify",
        myData: "/mydata"
    };

    let _method = 'get';
    let _headers = {};
    let _callback = ()=>1;
    let _getParams = '';
    let _postJson = null;

    let makeObject = () => {
        return Object.freeze({
            get,
            post,
            auth,
            callback,
            headers,
            send,
            session,
            img,
            imgUpload,
            cssimg
        });
    };

    let host = () => {
        return document.getElementById("apiHost").dataset.apiHost;
    }

    let img = name => {
        return `${host()}/img.get?file=${name}`;
    }

    let cssimg = name => {
        return `url(${host()}/img.get?file=${name})`;
    }

    let imgUpload = (name, ref) => {
        _method = 'post';
        let form = new FormData();
        form.set(name, ref.current.files[0]);
        _postJson = form;
        return makeObject();
    }

    let get = (params) => {
        _method = 'get';
        if(params !== undefined) {
            let temp = [];
            for(let i in params) {
                temp.push(`${i}=${params[i]}`);
            }
            _getParams = `?${temp.join('&')}`;
        }
        return makeObject();
    };

    let post = (obj) => {  
        _method = 'post';
        _postJson = JSON.stringify(obj);
        _headers['Content-Type'] = 'application/json';
        return makeObject();
    };

    let callback = (fn) => {
        _callback = fn;
        return makeObject();
    };

    let send = async () => {
        if(routes[routeName]===undefined) {
            return alert(`API маршрута ${routeName} не существует`);
        }
        let fetchParams = {
            method: _method,
            headers: _headers
        };
        if(_method === 'post') {
            fetchParams.body = _postJson;
        }
        try {
            let promise = await fetch(host()+routes[routeName]+_getParams, fetchParams);
            let response = undefined;
            response = await promise.json();
            _callback({ok: promise.ok, status: promise.status, array: response});
        }
        catch (err) {
            _callback({ok: false, status: undefined, array: undefined, error: err})
            console.log(err, routeName, routes[routeName]);
        }
    };

    let auth = () => {
        let token = localStorage.getItem('Authorization');
        if(token !== null) {
            _headers['Authorization'] = `Bearer ${token}`;
        }
        return makeObject();
    };

    let session = () => {
        let sess = localStorage.getItem('session');
        if(sess !== null) {
            _headers['X-Session'] = sess;
        }
        return makeObject();
    }

    let headers = (obj) => {
        for(let i in obj) {
            _headers[i] = obj[i];
        }
        return makeObject();
    };

    return makeObject();
};