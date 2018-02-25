from boa.blockchain.vm.Neo.Runtime import Notify, GetTrigger, CheckWitness
from boa.blockchain.vm.Neo.Action import RegisterAction
from boa.blockchain.vm.Neo.TriggerType import Application, Verification

from boa.blockchain.vm.Neo.TransactionType import InvocationTransaction
from boa.blockchain.vm.Neo.Transaction import *

from boa.blockchain.vm.System.ExecutionEngine import GetScriptContainer, GetExecutingScriptHash
from boa.blockchain.vm.Neo.TriggerType import Application, Verification
from boa.blockchain.vm.Neo.Output import GetScriptHash, GetValue, GetAssetId
from boa.blockchain.vm.Neo.Storage import GetContext, Get, Put, Delete

from boa.blockchain.vm.Neo.Blockchain import GetHeight

OWNER = b'\x30\x33\x33\x31\x34\x37\x33\x63\x37\x64\x32\x34\x65\x32\x36\x64\x62\x63\x38\x31\x65\x37\x31\x38\x39\x33\x33\x61\x34\x63\x30\x37\x61\x64\x35\x31\x36\x64\x35\x34\x63\x66\x64\x33\x35\x32\x39\x38\x36\x33\x64\x37\x39\x61\x64\x61\x65\x66\x31\x66\x33\x39\x65\x62\x65\x35'


NEO_ASSET_ID = b'\x63\x35\x36\x66\x33\x33\x66\x63\x36\x65\x63\x66\x63\x64\x30\x63\x32\x32\x35\x63\x34\x61\x62\x33\x35\x36\x66\x65\x65\x35\x39\x33\x39\x30\x61\x66\x38\x35\x36\x30\x62\x65\x30\x65\x39\x33\x30\x66\x61\x65\x62\x65\x37\x34\x61\x36\x64\x61\x66\x66\x37\x63\x39\x62'
GAS_ASSET_ID = b'\x36\x30\x32\x63\x37\x39\x37\x31\x38\x62\x31\x36\x65\x34\x34\x32\x64\x65\x35\x38\x37\x37\x38\x65\x31\x34\x38\x64\x30\x62\x31\x30\x38\x34\x65\x33\x62\x32\x64\x66\x66\x64\x35\x64\x65\x36\x62\x37\x62\x31\x36\x63\x65\x65\x37\x39\x36\x39\x32\x38\x32\x64\x65\x37'

def Main(args):

    print("Do Withdraw Test")

    trigger = GetTrigger()

    if trigger == Verification():

        print("doing verification")

        return True


        # check to see if the withdrawer is the owner

        is_owner = CheckWitness(OWNER)

        # always allow owner to withdraw

        if is_owner:
            can_widthraw = CanClaimGas()
            return can_widthraw

        else:
            can_widthraw = CanWithdrawNeo()
            return can_widthraw

    elif trigger == Application():
        print("doing application")

        operation = args[0]

        if operation == 'hodl':
            print("Hodling engaged!")
            deposit = DepositNeo()

            return deposit
    return False

def DepositNeo():
    # get reference to the tx the invocation is in
    tx = GetScriptContainer()

    references = tx.References

    if len(references) < 1:
        print("no neo attached")
        return False

    # we need to determine who sent the tx
    reference = references[0]
    sender = GetScriptHash(reference)

    # this will keep track of how much neo was deposited
    value = 0

    output_asset_id = GetAssetId(reference)

    if output_asset_id != NEO_ASSET_ID:
        print("Must deposit NEO")
        return False

    # this is the contract's address
    receiver = GetExecutingScriptHash()

    # go through all the outputs
    # and check if the receiver is the contract
    # if that is true, we add the value of the output to the
    # total sum that was deposited

    for output in tx.Outputs:
        shash = GetScriptHash(output)
        if shash == receiver:
            output_val = GetValue(output)
            value = value + output_val

    if value > 0:

        print("neo was deposited")
        Notify(value)

        timestamp = GetHeight()
        # now we know value was deposited from the sender

        context = GetContext()

        print("timestamp: ", timestamp)
        Put(context, "timestamp", timestamp)

        print("deposited")

        return True

    return False

def CanWithdrawNeo():

    print("[can withdraw Neo]")

    tx = GetScriptContainer()
    context = GetContext()

    for output in tx.Outputs:
        shash = GetScriptHash(output)
        output_asset_id = GetAssetId(output)

        if output_asset_id == NEO_ASSET_ID:
            print("Asset is Neo")

        else:

            return False

    return True

    saved_timestamp = Get(context, "timestamp")

    Notify("saved_timestamp: ", saved_timestamp)

    current_timestamp = GetHeight()

    Notify("current_timestamp: ", current_timestamp)

    return current_timestamp > (saved_timestamp + 4)


def CanClaimGas():
    print("Withdrawing Donations")

    tx = GetScriptContainer()
    tpe = GetType(tx)
    print("Type: ", tpe)

    for output in tx.Outputs:
        shash = GetScriptHash(output)
        output_asset_id = GetAssetId(output)

        if output_asset_id == GAS_ASSET_ID:
            print("Asset is Gas")

        else:

            return False

    return True
