
def auth_middlewares(get_request):
    from auth0.v3.authentication.token_verifier import (
        TokenVerifier,
        AsymmetricSignatureVerifier,
    )

    _domain = "dev-bg7tosd2.us.auth0.com"
    _client_id = "NDaiadS9ELFv44LNSoGHpSX94CxurV2J"

    def auth_verify(request):
        id_token = request.headers["auth-token"]

        jwks_url = "https://{}/.well-known/jwks.json".format(_domain)
        issuer = "https://{}/".format(_domain)

        sv = AsymmetricSignatureVerifier(jwks_url)  # Reusable instance
        tv = TokenVerifier(signature_verifier=sv, issuer=issuer, audience=_client_id)
        tv.verify(id_token)
        print("ok")
        res = get_request(request)
        return res

    return auth_verify

